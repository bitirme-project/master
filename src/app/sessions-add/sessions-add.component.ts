import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/environments/api.service';
import { ActivatedRoute } from '@angular/router';
import { datepickerLocale } from 'fullcalendar';
import { months } from 'moment';

@Component({
  selector: 'app-sessions-add',
  templateUrl: './sessions-add.component.html',
  styleUrls: ['./sessions-add.component.css']
})

export class SessionsAddComponent implements OnInit {
  item: any;
  constructor(private ApiService: ApiService, private route: ActivatedRoute) { }
  treatments: any[] = [
    {
      Vucut: { id: 2, name: "Vucut", ischecked: false },
      Kulak: { id: 3, name: "Kulak", ischecked: false },
      Major: { id: 4, name: "Major", ischecked: false },
      Minor: { id: 5, name: "Minor", ischecked: false },
      Kasici: { id: 6, name: "Kasici", ischecked: false },
      Rektal: { id: 7, name: "Rektal", ischecked: false },
      Hirudoterapi: { id: 8, name: "Hirudoterapi", ischecked: false },
      Kupakuru: { id: 9, name: "Kupa kuru", ischecked: false },
      Kupayas: { id: 10, name: "Kupayas", ischecked: false }
    }
  ]

  empty: any[] = [
    {
      Vucut: { id: 2, name: "Vucut", ischecked: false },
      Kulak: { id: 3, name: "Kulak", ischecked: false },
      Major: { id: 4, name: "Major", ischecked: false },
      Minor: { id: 5, name: "Minor", ischecked: false },
      Kasici: { id: 6, name: "Kasici", ischecked: false },
      Rektal: { id: 7, name: "Rektal", ischecked: false },
      Hirudoterapi: { id: 8, name: "Hirudoterapi", ischecked: false },
      Kupakuru: { id: 9, name: "Kupakuru", ischecked: false },
      Kupayas: { id: 10, name: "Kupayas", ischecked: false }
    }
  ]

  

  ngOnInit() {
    this.get()
  }
  date : Date;
  model: any = {  year: 2019 , month: 3 , day: 2};
  sessions: any
  get() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ApiService.getAllData("sessions/" + id).subscribe((data : any) => {
      this.sessions = data
      this.sessions.forEach((element: any) => {
        this.date = new Date(element.date)
        console.log(this.date.toISOString())
        element.ddate = {
          year : element.year,
          month : element.month,
          day : element.day
        }
        console.log(element.ddate)
        element.ttime = {
          hour : element.hour,
          minute : element.minute
        }
        console.log(element.ttime)
        element.treatments =  [
          {
            Vucut: { id: 2, name: "Vucut", ischecked: false },
            Kulak: { id: 3, name: "Kulak", ischecked: false },
            Major: { id: 4, name: "Major", ischecked: false },
            Minor: { id: 5, name: "Minor", ischecked: false },
            Kasici: { id: 6, name: "Kasici", ischecked: false },
            Rektal: { id: 7, name: "Rektal", ischecked: false },
            Hirudoterapi: { id: 8, name: "Hirudoterapi", ischecked: false },
            Kupakuru: { id: 9, name: "Kupakuru", ischecked: false },
            Kupayas: { id: 10, name: "Kupayas", ischecked: false }
          }
        ]
        this.ApiService.getAllData("session/" + element.id).subscribe((datas : any) => {
          datas.forEach(session => {
            if(session.treatment == "Vücut"){
              element.treatments[0].Vucut.ischecked=true
            }
            if(session.treatment == "Kulak"){
              element.treatments[0].Kulak.ischecked=true
            }
            if(session.treatment == "Major"){
              element.treatments[0].Major.ischecked=true
            }
            if(session.treatment == "Minor"){
              element.treatments[0].Minor.ischecked=true
            }
            if(session.treatment == "Kas içi"){
              element.treatments[0].Kasici.ischecked=true
            }
            if(session.treatment == "Rektal"){
              element.treatments[0].Rektal.ischecked=true
            }
            if(session.treatment == "Hirudoterapi"){
              element.treatments[0].Hirudoterapi.ischecked=true
            }
            if(session.treatment == "Kuru"){
              element.treatments[0].Kupakuru.ischecked=true
            }
            if(session.treatment == "Yaş"){
              element.treatments[0].Kupayas.ischecked=true
            }
          });
          //console.log(data)
          //element.details = datas
        })
        console.log(element)
      });
    })
  }

  timetoadd
  datetoadd
  datee : Date = new Date()
  add(){
    /*
    const date : any = { year: this.datetoadd.year , month:  this.datetoadd.month, day: this.datetoadd.day , hour:this.timetoadd.hour, minute: this.timetoadd.minute}
    console.log(date)
    this.datee
    this.datee.setFullYear(this.datetoadd.year)
    this.datee.setMonth(this.datetoadd.month)
    this.datee.setDate(this.datetoadd.day )
    this.datee.setHours(this.timetoadd.hour)
    this.datee.setMinutes(this.timetoadd.minute )
    console.log("Son ---> "+this.datee)*/

    const id = +this.route.snapshot.paramMap.get('id');
    const obj = { patientid: id , date : "2019-12-06T21:00:00.000Z" , year: this.datetoadd.year , month:this.datetoadd.month , 
      day:this.datetoadd.day, hour:this.timetoadd.hour, minute: this.timetoadd.minute }
    this.ApiService.addData(obj , "sessions").subscribe(data => { 
      //console.log(data ) ;
      const obj = { sessionid: data.id , treatmentid: null }
      if(this.treatments[0].Vucut.ischecked==true){
        console.log("Vücut")
        obj.treatmentid = 2
        this.ApiService.addData(obj , "session").subscribe(data => console.log(data))
      }
      if(this.treatments[0].Kulak.ischecked==true){
        console.log("Kulak")
        obj.treatmentid = 3
        this.ApiService.addData(obj , "session").subscribe(data => console.log(data))
      }
      if(this.treatments[0].Major.ischecked==true){
        console.log("Major")
        obj.treatmentid = 4
        this.ApiService.addData(obj , "session").subscribe(data => console.log(data))
      }
      if(this.treatments[0].Minor.ischecked==true){
        console.log("Minor")
        obj.treatmentid = 5
        this.ApiService.addData(obj , "session").subscribe(data => console.log(data))
      }
      if(this.treatments[0].Kasici.ischecked==true){
        console.log("Vücut")
        obj.treatmentid = 6
        this.ApiService.addData(obj , "session").subscribe(data => console.log(data))
      }
      if(this.treatments[0].Rektal.ischecked==true){
        console.log("Rektal")
        obj.treatmentid = 7
        this.ApiService.addData(obj , "session").subscribe(data => console.log(data))
      }
      if(this.treatments[0].Hirudoterapi.ischecked==true){
        console.log("Hirudoterapi")
        obj.treatmentid = 8
        this.ApiService.addData(obj , "session").subscribe(data => console.log(data))
      }
      if(this.treatments[0].Kupakuru.ischecked==true){
        console.log("Kupakuru")
        obj.treatmentid = 9
        this.ApiService.addData(obj , "session").subscribe(data => console.log(data))
      }
      if(this.treatments[0].Kupayas.ischecked==true){
        console.log("Kupayas")
        obj.treatmentid = 10
        this.ApiService.addData(obj , "session").subscribe(data => console.log(data))
      }
      this.get() 
    })
    
  }
}
