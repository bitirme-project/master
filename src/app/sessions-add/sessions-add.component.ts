import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/environments/api.service';
import { ActivatedRoute } from '@angular/router';
import { datepickerLocale } from 'fullcalendar';
import { months } from 'moment';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-sessions-add',
  templateUrl: './sessions-add.component.html',
  styleUrls: ['./sessions-add.component.css']
})

export class SessionsAddComponent implements OnInit {
  closeResult = ''; //burası popup
  item: any;
  constructor(private ApiService: ApiService, private route: ActivatedRoute,private modalService: NgbModal) { }
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
      console.log(data);
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
      day:this.datetoadd.day, hour:this.timetoadd.hour, minute: this.timetoadd.minute , price: this.totalprice }
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

  totalprice = 0;
  onChangeModel($event,id){
    let item = $event
    console.log($event)
    if(id==1){
      const akapunkturvucut = 300
      if(item == true){
        this.totalprice += akapunkturvucut
      }else{
        this.totalprice -= akapunkturvucut
      }
    }else if(id==2){
      const akapunkturkulak = 300
      if(item == true){
        this.totalprice += akapunkturkulak
      }else{
        this.totalprice -= akapunkturkulak
      }
    }else if(id==3){
      const ozonmajor = 350;
      if(item == true){
        this.totalprice += ozonmajor
      }else{
        this.totalprice -= ozonmajor
      }
    }else if(id==4){
      const ozonminor = 150
      if(item == true){
        this.totalprice += ozonminor
      }else{
        this.totalprice -= ozonminor
      }
    }else if(id==5){
      const ozonkasici = 150;
      if(item == true){
        this.totalprice += ozonkasici
      }else{
        this.totalprice -= ozonkasici
      }
    }else if(id==6){
      const ozonrektal = 100;
      if(item == true){
        this.totalprice += ozonrektal
      }else{
        this.totalprice -= ozonrektal
      }
    }else if(id==7){
      const hirudoterapi = 350
      if(item == true){
        this.totalprice += hirudoterapi
      }else{
        this.totalprice -= hirudoterapi
      }
    }else if(id==8){
      const kupakuru = 50
      if(item == true){
        this.totalprice += kupakuru
      }else{
        this.totalprice -= kupakuru
      }
    }else if(id==9){
      const kupayas = 50
      if(item == true){
        this.totalprice += kupayas
      }else{
        this.totalprice -= kupayas
      }
    }else if(id==10){
      const prp = 850
      if(item == true){
        this.totalprice += prp
      }else{
        this.totalprice -= prp
      }
    }

  }
  beforeprice = 0;
  currentsession : any = {}
  Open(content,session) { //pop up açma 
    console.log(session)
    this.currentsession=session
    this.beforeprice = session.price
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  savePrice(){
    const obj = this.currentsession;
    delete obj.ddate;
    delete obj.ttime;
    delete obj.treatments;
    console.log(this.currentsession)
    console.log(obj)
    this.ApiService.updateData(obj , "session").subscribe(data => { console.log("Updated"); this.get();})
    this.modalService.dismissAll('Clicked save')
  }


}
