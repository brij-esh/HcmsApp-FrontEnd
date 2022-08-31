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
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserSignupComponent } from './components/user/user-signup/user-signup.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { SlotBookingComponent } from './components/user/user-dashboard/slot-booking/slot-booking.component';

const routes: Routes = [
  { path:'', component:HomeComponent, pathMatch:'full' },
  { path:'admin-login', component:AdminLoginComponent },
  { path:'admin-dashboard', component:AdminDashboardComponent },
  { path:'patient-login', component:PatientLoginComponent },
  { path:'doctor-login', component:DoctorLoginComponent},
  { path:'pharmacy-login', component:PharmacyLoginComponent },
  { path:'view-pharmacy', component:ViewPharmacyComponent},
  { path:'view-doctor', component:ViewDoctorComponent},
  { path:'doctor-dashboard', component:DoctorDashboardComponent},
  { path:'user-login', component:UserLoginComponent},
  { path:'user-signup', component:UserSignupComponent},
  { path:'user-dashboard', component:UserDashboardComponent},
  { path:'slot-booking', component:SlotBookingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
