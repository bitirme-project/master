import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.css']
})
export class CashComponent implements OnInit {
  items: any = [{headers:""}];
  item: any;
  constructor() { }
  price: any[] = [ //burası listelerken aylık listelemeler veri tabanından bu veriler gelicek
    { date: "21.05.2020", price: "350", treatments: "sülük"},
    { date: "27.05.2020", price: "350", treatments: "hidro" },
    { date: "28.05.2020", price: "350", treatments: "hidro2" },
    { date: "29.05.2020", price: "350", treatments: "hidro3" },
    { date: "30.05.2020", price: "350", treatments: "hidro4" },
    { date: "30.05.2020", price: "350", treatments: "hidro5" }
  ]

  ngOnInit() {
    this.items = [{headers:""}]
    //this.get()
   let chart = new Chart('canvas', { //bu tablo labels aylar data ise toplam gelir , 
     type:'bar', //pie -- youtube videosu vardı. Data total geliri o aylık price ları toplayıp yazılabilir.
     //olmazsa buraya her ay elle toplamı yazmak ya da kaldırmak?!?
     data: {
      labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
      datasets: [{
          label: ' Aylık Kazanç',
          data: [2500, 6000, 3500, 0, 0, 0,0,0,0,0,0,0],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
    options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
    })
   
  }

  get(){
    //this.ApiService.getAllData("patient").subscribe(data => { this.patients = data})
  }
}
