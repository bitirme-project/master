import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/environments/api.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  clients: any[];
  dataTable: any[];
  items: any = [{ headers: "" }];
  item: any;
  constructor(private ApiService: ApiService) { }

  patients: any[] = [
    { firstName: "a", lastName: "a", tc: "", size: "", weight: "", job: "", birthdate: "", age: "", gender: "", phone: "", mail: "", address: "" },
    { firstName: "b", lastName: "b", tc: "", size: "", weight: "", job: "", birthdate: "", age: "", gender: "", phone: "", mail: "", address: "" }
  ]
  ngOnInit() {

    this.items = [{ headers: "" }]
    this.get();
    this.getTreatments();
  }

  searchText: any = ""

  get() {
    this.ApiService.getAllData("patient").subscribe(data => { this.patients = data })
  }
  patient: any = { firstName: "", lastName: "" }
  page = 1;
  pageSize = 10;
  loading = false;
  MLData: any = { seans_sayisi: 0, tedavi: [] }
  MachineLearning($event) {
    this.loading = true;
    this.MLData = { seans_sayisi: 0, tedavi: [] }
    var item = $event
    this.patient = item
    console.log(this.patient)
    var str1 = ""
    var str2 = ""
    const obj: any = { boy: item.size, kilo: item.weight, age: item.age, meslek: item.job, cinsiyet: item.gender, sikayet: item.Complaint, tani: item.diagnosis }
    this.ApiService.getAllData("disseases/" + item.id).subscribe(hastalik => {
      this.ApiService.getAllData("medicines/" + item.id).subscribe(ilac => {
        hastalik.forEach((element: any) => {
          str1 += element.name + ",";
        });
        ilac.forEach((element: any) => {
          str2 += element.name + ",";
        });
        obj.hastalik = str1
        obj.ilac = str2
        //Burada post servisi yollanacak.
        this.ApiService.addData(obj, "setData").subscribe(data => { console.log(data); obj })
        //console.log(obj)
      })
    })
    setTimeout(() => {
      this.ApiService.getAllData("getResult").subscribe(data => {
        this.MLData = data;
        this.selected = []
        this.dates = []
        this.times = []
        for (let index = 0; index < this.MLData.tedavi.length; index++) {
          this.selected[index] = this.MLData.tedavi[index]
          let time: any = {
            hour: 9,
            minute: 0,
            seconds: 0
          }
          this.times[index] = time
    
          let date = new Date()
          let today: any = {
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDay()
          }
        }
        this.loading = false;
      })
    }, 2000)
  }

  treatments
  getTreatments() {
    this.ApiService.getAllData("treatments").subscribe(data => {
      this.treatments = data
      console.log(data)
    })
  }
  dates: any = []
  times: any = []
  selected: any = [{ id: "", name: "", treat: "" }]
  Test() {

    this.MLData = {
      seans_sayisi: '10',
      tedavi: [
        '2', '3', '2',
        '3', '2', '3',
        '2', '3'
      ]
    }
    this.selected = []
    for (let index = 0; index < this.MLData.tedavi.length; index++) {
      let time: any = {
        hour: 9,
        minute: 0,
        seconds: 0
      }
      this.times[index] = time

      let date = new Date()
      let today: any = {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDay()
      }

      this.dates[index] = today
    }
    for (let index = 0; index < this.MLData.tedavi.length; index++) {
      this.selected[index] = this.MLData.tedavi[index]
    }
  }



  onSelect(obj, index, trid) {
    this.selected[index] = +obj
  }

  add() {
    for (let i = 0; i < this.MLData.tedavi.length; i++) {
      const obj = { patientid: this.patient.id , date : "2019-12-06T21:00:00.000Z" , year: this.dates[i].year , month:this.dates[i].month , 
      day:this.dates[i].day, hour:this.times[i].hour, minute: this.times[i].minute, price:0 }
      this.ApiService.addData(obj,"sessions").subscribe(data => { console.log("added")})
    }
  }

  /*
  {
    seans_sayisi: '10',
    tedavi: [
      'akupunktur vücut',
      'akupunktur kulak',
      'kupa tedavisi kuru',
      'akupunktur vücut',
      'akupunktur kulak',
      'akupunktur kulak',
      'akupunktur vücut',
      'akupunktur vücut',
      'akupunktur vücut',
      'akupunktur vücut'
    ]
  }
  /*
  
    /*
    receiving_data = {'boy':177, 'kilo':77, 'yas':55, 'meslek':'text', 'cinsiyet':'erkek',
                     'sikayet':'text', 'tani':'text',
                     'hastalik':'cat1,cat2,cat3..', 'ilac':'cat1,cat2,cat3..'}
    */
}