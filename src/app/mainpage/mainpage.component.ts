import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import * as moment from 'moment';
import 'fullcalendar';
import { ApiService } from 'src/environments/api.service';
import localetr from '@fullcalendar/core/locales/tr';

@Component({
   selector: 'app-mainpage',
   templateUrl: './mainpage.component.html',
   styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

   @Input()
   set configurations(config: any) {
      if (config) {
         this.defaultConfigurations = config;
      }
   }

   calendarOptions = {
      height: 'auto',
      contentHeight: 'auto',
      fixedWeekCount: false,
     
      
      editable: false,
      click:true,
      eventLimit: true,
      defaultView: 'agendaWeek',
      slotDuration: '01:00:00',
      firstDay: 1,
      header: {
         right: 'today prev,next'
      },
      events: [
      ]
   };

   @Input() eventData: any;

   defaultConfigurations: any;

   constructor(private Apiservice:ApiService) {
      this.eventData = [
         {
            title: 'samet',
            start: moment()
         },
         {
            title: 'event2',
            start: moment(),
            end: moment().add(2, 'days')
         },
         {
            title: 'event3',
            start: moment(),

         },
      ];
      this.defaultConfigurations = {
         editable: false,
         eventLimit: true,
         
         titleFormat: 'MMM D YYYY',
         header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
         },
         monthNames:['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
         monthNamesShort:['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
         dayNames:['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'],
         dayNamesShort:['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'],
         buttonText: {
            today: 'Bugün',
            month: 'Ay',
            week: 'Hafta',
            day: 'Gün'

         },
         views: {
            agenda: {
               eventLimit: 2
            }
         },
         allDaySlot: false,
         slotDuration: moment.duration('00:15:00'),
         slotLabelInterval: moment.duration('01:00:00'),
         firstDay: 1,
         selectable: true,
         selectHelper: true,

         dayClick: (date, jsEvent, activeView) => {
            this.dayClick(date, jsEvent, activeView);
         },

         eventDragStart: (timeSheetEntry, jsEvent, ui, activeView) => {
            this.eventDragStart(
               timeSheetEntry, jsEvent, ui, activeView
            );
         },
         eventDragStop: (timeSheetEntry, jsEvent, ui, activeView) => {
            this.eventDragStop(
               timeSheetEntry, jsEvent, ui, activeView
            );
         },
      };
   }
   dayClick(date, jsEvent, activeView) {
      console.log('day click');
   }
   eventDragStart(timeSheetEntry, jsEvent, ui, activeView) {
      console.log('event drag start');
   }
   eventDragStop(timeSheetEntry, jsEvent, ui, activeView) {
      console.log('event drag end');
   }

   ngOnInit() {    
      let newEvents = [
      ],timeFormat: 'H:mma';

      $('#full-calendar').fullCalendar(
         this.defaultConfigurations,
        
      );
      
      var dateText = '03/16/2020';

      this.Apiservice.getAllData("callendar").subscribe(data => { 
         data.forEach((element : any) => {

            const title= element.month+"/"+ element.day+"/"+element.year
            console.log(title);
            console.log(element.hour+":"+element.minute);
           const x= "20"+element.year+"-0"+element.month+"-0"+element.day+"T"+element.hour+":"+element.minute+":00" ;
           console.log(x);
            
           if(element.hour==0 && element.minute==0)
           {
              if(element.month>9)
              {
                  if(element.day>9)
                  {
                     
                        newEvents.push({id:element.id ,title:element.firstname+"\n"+element.lastname+"\n"+element.traetname,start:  "20"+element.year+"-"+element.month+"-"+element.day+"T0"+element.hour+":0"+element.minute+":00", hour:element.hour, minute: element.minute  ,slotDuration:'00:10',meridiem: false , })

                    
                  }
                  else{
                    
                     
                        newEvents.push({id:element.id ,title:element.firstname+"\n"+element.lastname+"\n"+element.traetname,start:  "20"+element.year+"-"+element.month+"-0"+element.day+"T0"+element.hour+":0"+element.minute+":00", hour:element.hour, minute: element.minute  ,slotDuration:'00:10',meridiem: false , })
                     
                  
                  }
              }
              else{ // ay 9 dan kucuk
               if(element.day>9)
               {
                 
                  
                  
                     newEvents.push({id:element.id ,title:element.firstname+"\n"+element.lastname+"\n"+element.traetname,start:  "20"+element.year+"-0"+element.month+"-"+element.day+"T0"+element.hour+":0"+element.minute+":00", hour:element.hour, minute: element.minute  ,slotDuration:'00:10',meridiem: false , })
                  
                
               }
               else{
                 
                  
                  
                     newEvents.push({id:element.id ,title:element.firstname+"\n"+element.lastname+"\n"+element.traetname,start:  "20"+element.year+"-0"+element.month+"-0"+element.day+"T0"+element.hour+":0"+element.minute+":00", hour:element.hour, minute: element.minute  ,slotDuration:'00:10',meridiem: false , })
                  
                 
               }
              }
              
           
           }
           else{
            if(element.month>9)
            {
                if(element.day>9)
                {
                   
                   
                  
                     newEvents.push({id:element.id ,title:+"\n"+element.firstname+"\n"+element.lastname+"\n"+element.traetname,start:  "20"+element.year+"-"+element.month+"-"+element.day+"T"+element.hour+":"+element.minute+":00", hour:element.hour, minute: element.minute  ,slotDuration:'00:10',meridiem: false , })
                   
                 
                }
                else{
                
                     newEvents.push({id:element.id ,title:element.firstname+"\n"+element.lastname+"\n"+element.traetname,start:  "20"+element.year+"-"+element.month+"-0"+element.day+"T"+element.hour+":"+element.minute+":00", hour:element.hour, minute: element.minute  ,slotDuration:'00:10',meridiem: false , })
                  
                
                }
            }
            else{ // ay 9 dan kucuk
             if(element.day>9)
             {
               
                  newEvents.push({id:element.id ,title:element.firstname+"\n"+element.lastname+"\n"+element.traetname,start:  "20"+element.year+"-0"+element.month+"-"+element.day+"T"+element.hour+":"+element.minute+":00", hour:element.hour, minute: element.minute  ,slotDuration:'00:10',meridiem: false , })
                
              
             }
             else{
               
                  newEvents.push({id:element.id ,title:element.firstname+"\n"+element.lastname+"\n"+element.traetname,start:  "20"+element.year+"-0"+element.month+"-0"+element.day+"T"+element.hour+":"+element.minute+":00", hour:element.hour, minute: element.minute  ,slotDuration:'00:10',meridiem: false , })
                
               
             }
            }
           }
            // "20"+element.year+"-"+element.month+"-"+element.day+"T"+element.hour+":"+element.minute+":00"
         });
         // 2010-01-01T14:30:00
         console.log(data) 
         this.defaultConfigurations.events = newEvents;
         $('#full-calendar').fullCalendar('renderEvents', newEvents, true);
         
      })


   




   }

}
