import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/environments/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent implements OnInit {

  itemList = [];
  selectedItems = [];
  settings = {};

  itemList1 = [];
  selectedItems1 = [];
  settings1 = {};

  itemList2 = [];
  selectedItems2 = [];
  settings2 = {};

  count = 6;
  constructor(private ApiService: ApiService, private router: Router) {

  }
  patient: any = { firstName: "", lastName: "", tc: "", size: "", weight: "", job: "", birthdate: "", age: "", gender: "", phone: "", mail: "", address: "", Complaint: "", file: "", patientid: "", diagnosis: "" }
  ngOnInit() {
    this.get()

    this.settings = {
      singleSelection: false,
      text: "Kullandığı İlaçları Seçiniz",
      selectAllText: 'Hepsini Seçiniz',
      unSelectAllText: 'Seçimleri Temizle',
      enableSearchFilter: true,
      addNewItemOnFilter: true,
      primaryKey: 'id',
      labelKey: 'name',
    };

    this.settings1 = {
      singleSelection: false,
      text: "Alerjileri Seçiniz",
      selectAllText: 'Hepsini Seçiniz',
      unSelectAllText: 'Seçimleri Temizle',
      enableSearchFilter: true,
      addNewItemOnFilter: true,
      primaryKey: 'id',
      labelKey: 'name',
    };

    this.settings2 = {
      singleSelection: false,
      text: "Geçirmiş Olduğu Hastalıkları Giriniz",
      selectAllText: 'Hepsini Seçiniz',
      unSelectAllText: 'Seçimleri Temizle',
      enableSearchFilter: true,
      addNewItemOnFilter: true,
      primaryKey: 'id',
      labelKey: 'name',
    };
  }
  get() {
    this.ApiService.getAllData("allergy").subscribe(data => { this.itemList1 = data })
    this.ApiService.getAllData("medicines").subscribe(data => { this.itemList = data })
    this.ApiService.getAllData("disseases").subscribe(data => { this.itemList2 = data })
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
  response  //this.patient.firstName!="" && this.patient.lastName!="" && this.patient.tc!="" && yedeklendi &&this.patient.phone!="" &&this.patient.mail!=""
  add() { //, size: "", weight: "", job: "", birthdate: "", age: "", gender: "", phone: "", mail: "", address: "", Complaint: "", file: "" }
    //if(this.patient.size!="" &&this.patient.weight!="" &&this.patient.job!="" &&this.patient.birthdate!="" &&this.patient.age!="" &&this.patient.gender!=""  &&this.patient.address!="" &&this.patient.Complaint!=""   )
    //{
      this.ApiService.addData(this.patient, "patient").subscribe(data => {
        this.response = data;
        console.log("response --> " + this.response.id)
        this.addsmt(data.id)
        this.router.navigate(['/patientlist/'])
      })
    //}

  }

  addsmt(id) {
    this.selectedItems.forEach(element => {
      const obj = { patientid: id, medicineid: element.id }
      this.ApiService.addData(obj, "medicinespatient").subscribe(data => { console.log(data) })
    });
    this.selectedItems1.forEach(element => {
      const obj = { patientid: id, allergyid: element.id }
      this.ApiService.addData(obj, "allergypatient").subscribe(data => { console.log(data) })
    });
    this.selectedItems2.forEach(element => {
      const obj = { patientid: id, diseasesid: element.id }
      this.ApiService.addData(obj, "diseasespatient").subscribe(data => { console.log(data) })
    });
  }
  onAddItem(data: string) {
    const obj = { name: data }
    this.ApiService.addData(obj, "medicines").subscribe(data => { ; console.log(data); this.selectedItems.push(data); this.get() })
  }
  onAddItem1(data: string) {
    const obj = { name: data }
    this.ApiService.addData(obj, "allergy").subscribe(data => { console.log(data); this.selectedItems1.push(data); this.get() })
  }
  onAddItem2(data: string) {
    const obj = { name: data }
    this.ApiService.addData(obj, "diseases").subscribe(data => { console.log(data); this.selectedItems2.push(data); this.get() })
  }
}