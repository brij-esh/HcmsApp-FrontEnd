import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterNavBarComponent } from './components/footer-nav-bar/footer-nav-bar.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DoctorLoginComponent } from './components/doctor-login/doctor-login.component';
import { PharmacyLoginComponent } from './components/pharmacy-login/pharmacy-login.component';
import { AddDoctorComponent } from './components/admin-dashboard/doctor/add-doctor/add-doctor.component';
import { DeleteDoctorComponent } from './components/admin-dashboard/doctor/delete-doctor/delete-doctor.component';
import { UpdateDoctorComponent } from './components/admin-dashboard/doctor/update-doctor/update-doctor.component';
import { ViewDoctorComponent } from './components/admin-dashboard/doctor/view-doctor/view-doctor.component';
import { AddPharmacyComponent } from './components/admin-dashboard/pharmacy/add-pharmacy/add-pharmacy.component';
import { DeletePharmacyComponent } from './components/admin-dashboard/pharmacy/delete-pharmacy/delete-pharmacy.component';
import { UpdatePharmacyComponent } from './components/admin-dashboard/pharmacy/update-pharmacy/update-pharmacy.component';
import { ViewPharmacyComponent } from './components/admin-dashboard/pharmacy/view-pharmacy/view-pharmacy.component';
import { ViewSlotComponent } from './components/admin-dashboard/view-slot/view-slot.component';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserSignupComponent } from './components/user/user-signup/user-signup.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { SlotBookingComponent } from './components/user/user-dashboard/slot-booking/slot-booking.component';
import { PaymentComponent } from './components/user/user-dashboard/slot-booking/payment/payment.component';
import { PharmacyDashboardComponent } from './components/pharmacy-dashboard/pharmacy-dashboard.component';
import { UpdateSlotComponent } from './components/user/user-dashboard/update-slot/update-slot.component';
import { RevenueComponent } from './components/admin-dashboard/revenue/revenue.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    HomeComponent,
    NavBarComponent,
    FooterNavBarComponent,
    AdminLoginComponent,
    DoctorLoginComponent,
    PharmacyLoginComponent,
    AddDoctorComponent,
    DeleteDoctorComponent,
    UpdateDoctorComponent,
    ViewDoctorComponent,
    AddPharmacyComponent,
    DeletePharmacyComponent,
    UpdatePharmacyComponent,
    ViewPharmacyComponent,
    ViewSlotComponent,
    DoctorDashboardComponent,
    UserLoginComponent,
    UserSignupComponent,
    UserDashboardComponent,
    SlotBookingComponent,
    PaymentComponent,
    PharmacyDashboardComponent,
    UpdateSlotComponent,
    RevenueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatNativeDateModule,
    DatePipe,
    Ng2SearchPipeModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
