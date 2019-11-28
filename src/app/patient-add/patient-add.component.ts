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
  count = 6;
  constructor(private ApiService:ApiService) {

  }
  patient : any = { firstName:"",lastName:"",tc:"" , size:"" , weight:"" , job:"" , birthdate:"" , age:"" , gender:"" , phone:"" , mail:"" , address:"" }
  ngOnInit() {

    this.itemList = [
      { "id": 1, "itemName": "India", "name": "IN" },
      { "id": 2, "itemName": "Singapore", "name": "SN" },
      { "id": 3, "itemName": "Australia", "name": "AU" },
      { "id": 4, "itemName": "Canada", "name": "CA" },
      { "id": 5, "itemName": "South Korea", "name": "SK" },
      { "id": 6, "itemName": "Brazil", "name": "BR" }
    ];

    this.selectedItems = [
      { "id": 1, "itemName": "India", "name": "IN" },
      { "id": 2, "itemName": "Singapore", "name": "SN" },
      { "id": 3, "itemName": "Australia", "name": "AU" },
      { "id": 4, "itemName": "Canada", "name": "CA" }];
    this.settings = {
      singleSelection: false,
      text: "Select Countries",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
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
    //console.log(this.patient)
    this.ApiService.addData(this.patient,"patient").subscribe()
  }
}