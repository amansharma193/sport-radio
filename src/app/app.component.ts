import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title:string = 'sport-app';
  baseURL:string='https://sportsradio.app/sportsradioappapi/interviewtasks/task1';
  tournament=[];
  filter:string='ALL';
  dateMap:Map<string,any[]>=new Map<string,any[]>();
  constructor(private http: HttpClient){

  }
  ngOnInit(): void {
    this.http.get(this.baseURL).subscribe((data:any)=>{
      console.log(data);
      this.tournament=data;
      this.filterTournament();
    })
  }
  filterData(e:any){
    this.filter=e.name;
    this.filterTournament();
  }
  filterTournament(){
    this.dateMap=new Map<string,any[]>();
    this.tournament.sort(function(a,b){
      // @ts-ignore
      return new Date(a.start_date) - new Date(b.start_date);
    });
    this.tournament.forEach((e)=>{
      // @ts-ignore
      if(this.filter=='ALL' || e.gender==this.filter.toLowerCase()){
        // @ts-ignore
        let arr=this.dateMap.get(e.series_start_datetime_month_year);
        if(!arr){
          arr=[];
        }
        arr.push(e);
        arr=_.uniqBy(arr,x=>x.tournament_key);
        // @ts-ignore
        this.dateMap.set(e.series_start_datetime_month_year,arr);
      }
    })
    console.log(this.dateMap);
  }
}
