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
  constructor(private ApiService:ApiService) {

  }
  patient : any = { firstName:"",lastName:"",tc:"" , size:"" , weight:"" , job:"" , birthdate:"" , age:"" , gender:"" , phone:"" , mail:"" , address:"",sikayet:"",file:"" }
  ngOnInit() {
    this.ApiService.getAllData("patient").subscribe(data => { console.log(data) })
    this.ApiService.getAllData("treatments").subscribe(data => { console.log(data) })

    this.itemList = [
      { "id": 1, "itemName": "İlaç1", "name": "IL1" },
      { "id": 2, "itemName": "İlaç2", "name": "IL2'" },
      { "id": 3, "itemName": "İlaç3", "name": "IL3" },
      { "id": 4, "itemName": "İlaç4", "name": "IL4" }
    ];

    this.selectedItems = [
      { "id": 1, "itemName": "İlaç1", "name": "IL1" },
      { "id": 2, "itemName": "İlaç2", "name": "IL2" }];
    this.settings = {
      singleSelection: false,
      text: "Kullandığı İlaçları Seçiniz",
      selectAllText: 'Hepsini Seçiniz',
      unSelectAllText: 'Seçimleri Temizle',
      enableSearchFilter: true,
      addNewItemOnFilter: true
    };
    ///Alerjiler
    this.itemList1 = [
      { "id": 1, "itemName": "Alerji1", "name": "AL1" },
      { "id": 2, "itemName": "Alerji2", "name": "AL2" },
      { "id": 3, "itemName": "Alerji3", "name": "AU" },
      { "id": 4, "itemName": "Alerji4", "name": "CA" }
    ];

    this.selectedItems1 = [
      { "id": 1, "itemName": "Alerji1", "name": "AL1" },
      { "id": 2, "itemName": "Alerji2", "name": "AL2" }];
    this.settings1 = {
      singleSelection: false,
      text: "Alerjileri Seçiniz",
      selectAllText: 'Hepsini Seçiniz',
      unSelectAllText: 'Seçimleri Temizle',
      enableSearchFilter: true,
      addNewItemOnFilter: true
    };
    //Geçmiş Hastalıklar
    this.itemList2 = [
      { "id": 1, "itemName": "Hastalık1", "name": "HS1" },
      { "id": 2, "itemName": "Hastalık2", "name": "HS2" },
      { "id": 3, "itemName": "Hastalık3", "name": "HS3" },
      { "id": 4, "itemName": "Hastalık4", "name": "HS4" }
    ];

    this.selectedItems2 = [
      { "id": 1, "itemName": "Hastalık1", "name": "HS1" },
      { "id": 2, "itemName": "Hastalık2", "name": "HS2" }];
    this.settings2 = {
      singleSelection: false,
      text: "Geçirmiş Olduğu Hastalıkları Giriniz",
      selectAllText: 'Hepsini Seçiniz',
      unSelectAllText: 'Seçimleri Temizle',
      enableSearchFilter: true,
      addNewItemOnFilter: true
    };
  }
  onAddItem(data: string) {
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

  add(){
    this.ApiService.addData(this.patient,"patient").subscribe(data => console.log(data))
  }
}