import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { PatientUpdateComponent } from './patient-update/patient-update.component';
import { SessionsAddComponent } from './sessions-add/sessions-add.component';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    PatientAddComponent,
    PatientListComponent,
    NavbarComponent,
    LoginComponent,
    FooterComponent,
    PatientUpdateComponent,
    SessionsAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMultiSelectModule,
    FormsModule,
    HttpClientModule,
    NgbPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
