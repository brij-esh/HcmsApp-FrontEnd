import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ViewDoctorComponent } from './components/admin-dashboard/doctor/view-doctor/view-doctor.component';
import { ViewPharmacyComponent } from './components/admin-dashboard/pharmacy/view-pharmacy/view-pharmacy.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DoctorLoginComponent } from './components/doctor-login/doctor-login.component';
import { HomeComponent } from './components/home/home.component';
import { PatientLoginComponent } from './components/patient-login/patient-login.component';
import { PharmacyLoginComponent } from './components/pharmacy-login/pharmacy-login.component';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';

const routes: Routes = [
  { path:'', component:HomeComponent, pathMatch:'full' },
  { path:'admin-login', component:AdminLoginComponent },
  { path:'admin-dashboard', component:AdminDashboardComponent },
  { path:'patient-login', component:PatientLoginComponent },
  { path:'doctor-login', component:DoctorLoginComponent},
  { path:'pharmacy-login', component:PharmacyLoginComponent },
  { path: 'view-pharmacy', component:ViewPharmacyComponent},
  { path: 'view-doctor', component:ViewDoctorComponent},
  { path: 'doctor-dashboard', component:DoctorDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
