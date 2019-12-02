import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sessions-add',
  templateUrl: './sessions-add.component.html',
  styleUrls: ['./sessions-add.component.css']
})
export class SessionsAddComponent implements OnInit {
  item: any;
  constructor() { }
  patients: any[] = [
    { Vucut:"Vucut", Kulak:"Kulak",Major:"Major",Minor:"Minor",Kasici:"Kasici",Rektal:"Rektal" ,Hirudoterapi:"Hirudoterapi",Kupakuru:"Kuru",Kupayas:"YAS" },
   

  ]
  ngOnInit() {
    
  }

}
