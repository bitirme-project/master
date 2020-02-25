import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/environments/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-update',
  templateUrl: './patient-update.component.html',
  styleUrls: ['./patient-update.component.css']
})
export class PatientUpdateComponent implements OnInit {
  itemList = [];
  selectedItems = [];
  settings = {};

  itemList1 = [];
  selectedItems1 = [];
  settings1 = {};

  itemList2 = [];
  selectedItems2 = [];
  settings2 = {};

  constructor( private ApiService:ApiService , private route:ActivatedRoute) { }
  patient: any = { id:null, firstName: "", lastName: "", tc: "", size: "", weight: "", job: "", birthdate: "", age: "", gender: "", phone: "", mail: "", address: "", Complaint: "", file: "", patientid: "", diagnosis: "" }

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

  get(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.ApiService.getAllData("patient/"+id).subscribe(data => { this.patient = data ; console.log(data) })
    this.ApiService.getAllData("allergy").subscribe(data => { 
      this.itemList1 = data 
      this.ApiService.getAllData("allergy/"+id).subscribe(data => { this.selectedItems1=data})
    })
    this.ApiService.getAllData("medicines").subscribe(data => { 
      this.itemList = data 
      this.ApiService.getAllData("medicines/"+id).subscribe(data => { this.selectedItems = data })
    })
    this.ApiService.getAllData("disseases").subscribe(data => { 
      this.itemList2 = data 
      this.ApiService.getAllData("disseases/"+id).subscribe(data => { this.selectedItems2 = data })
    })
  }

  update(){
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(this.patient)
    this.ApiService.deleteData(id,"allergy").subscribe()
    this.ApiService.deleteData(id,"medicines").subscribe()
    this.ApiService.deleteData(id,"diseases").subscribe()
    this.ApiService.updateData(this.patient,"patient").subscribe(data => { 
      this.patient = data ; 
      console.log(data) 
    })
    this.addsmt(id)
  }

  addsmt(id){
    this.selectedItems.forEach(element => {
      const obj = { patientid: id , medicineid:element.id }
      this.ApiService.addData(obj,"medicinespatient").subscribe(data => { console.log(data) })
    });
    this.selectedItems1.forEach(element => {
      const obj = { patientid: id, allergyid:element.id }
      this.ApiService.addData(obj,"allergypatient").subscribe(data => { console.log(data) })
    });
    this.selectedItems2.forEach(element => {
      const obj = { patientid: id , diseasesid:element.id }
      this.ApiService.addData(obj,"diseasespatient").subscribe(data => { console.log(data) })
    });
  }
}
