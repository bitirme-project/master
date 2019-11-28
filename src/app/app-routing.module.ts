import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';
import { LoginComponent } from './login/login.component';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientUpdateComponent } from './patient-update/patient-update.component';
import { SessionsAddComponent } from './sessions-add/sessions-add.component';


const routes: Routes = [
  { path:'' , component: LoginComponent},
  { path:'mainpage' , component: MainpageComponent},
  { path:'patientadd', component:PatientAddComponent},
  { path:'patientlist', component:PatientListComponent},
  {path:'patientupdate',component:PatientUpdateComponent},
  {path:'sessionadd',component:SessionsAddComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
