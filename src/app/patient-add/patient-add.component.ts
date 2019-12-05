import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/environments/api.service';

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
  constructor(private ApiService: ApiService) {

  }
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
  get() {
    this.ApiService.getAllData("allergy").subscribe(data => { this.itemList1 = data })
    this.ApiService.getAllData("medicines").subscribe(data => { this.itemList = data })
    this.ApiService.getAllData("diseases").subscribe(data => { this.itemList2 = data })
  }
  onAddItem(data: string) {
    const obj = { name: data }
    this.ApiService.addData(obj, "medicines").subscribe(data => {console.log(data) ; this.get() })
    this.count++;
    this.itemList.push({ "id": this.count, "itemName": data, "name": data });
    this.selectedItems.push({ "id": this.count, "itemName": data, "name": data });
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
  response
  add() {
    this.ApiService.addData(this.patient, "patient").subscribe(data => { this.response=data ; console.log("response --> " + this.response)})
  }

  onAddItem1(data: string) {
    this.count++;
    this.itemList.push({ "id": this.count, "itemName": data, "name": data });
    this.selectedItems.push({ "id": this.count, "itemName": data, "name": data });
  }
}