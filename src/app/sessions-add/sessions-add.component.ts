import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/environments/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sessions-add',
  templateUrl: './sessions-add.component.html',
  styleUrls: ['./sessions-add.component.css']
})
export class SessionsAddComponent implements OnInit {
  item: any;
  constructor(private ApiService:ApiService , private route:ActivatedRoute) { }
  patients: any[] = [
    { Vucut:"Vucut", Kulak:"Kulak",Major:"Major",Minor:"Minor",Kasici:"Kasici",Rektal:"Rektal" ,Hirudoterapi:"Hirudoterapi",Kupakuru:"Kuru",Kupayas:"YAS" },
   

  ]
  ngOnInit() {
    this.get()
  }
  sessions
  get(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.ApiService.getAllData("sessions/"+id).subscribe(data => this.sessions=data)
  }

}
