import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  @Input() match:any;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.match);
  }

}
