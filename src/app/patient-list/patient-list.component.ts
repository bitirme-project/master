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
    this.get()
  }

  searchText: any = ""

  get() {
    this.ApiService.getAllData("patient").subscribe(data => { this.patients = data })
  }
  page = 1;
  pageSize = 10;
  loading = false;
  MLData: any = { seans_sayisi: 0, tedavi: [] }
  MachineLearning($event) {
    this.loading = true;
    this.MLData = { seans_sayisi: 0, tedavi: [] }
    var item = $event
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
      this.ApiService.getAllData("getResult").subscribe(data => { this.MLData = data; console.log(data); this.loading=false; })
    }, 5000)
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