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
  patient: any = { firstName: "", lastName: "", tc: "", size: "", weight: "", job: "", birthdate: "", age: "", gender: "", phone: "", mail: "", address: "", sikayet: "", file: "" }

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
  }

}
