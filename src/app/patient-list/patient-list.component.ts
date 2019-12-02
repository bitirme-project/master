import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/environments/api.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  clients: any[];
  dataTable:any[];
  items: any = [{headers:""}];
  item: any;
  constructor(private ApiService:ApiService) { }

  patients: any[] = [
    { firstName: "a", lastName: "a", tc: "", size: "", weight: "", job: "", birthdate: "", age: "", gender: "", phone: "", mail: "", address: "" },
    { firstName: "b", lastName: "b", tc: "", size: "", weight: "", job: "", birthdate: "", age: "", gender: "", phone: "", mail: "", address: "" }

  ]
  ngOnInit() {

    this.items = [{headers:""}]
    this.get()
  }

  get(){
    this.ApiService.getAllData("patient").subscribe(data => { this.patients = data})
  }
  page = 1;
  pageSize = 10;
  
}