import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/class/doctor';
import { AdminService } from 'src/app/services/admin.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent implements OnInit {

  doctor= new Doctor();
  msg = '';

  constructor(private doctorService:DoctorService,
    private router:Router,
    private adminService:AdminService
    ) { }

  ngOnInit(): void {
    this.adminService.isVisible = false;
  }

  go(){
    this.router.navigate(['/doctor-dashboard']);
  }
  
  loginDoctor(){
    this.doctorService.loginDoctorFromRemote(this.doctor).subscribe(
      (data)=>{
        console.log("response recieved");
        this.go();
      },
      (error)=>{
        console.log("Exception occured");
        this.msg = "Bad credentials, please enter valid DoctorId and password";
        
      }
      
    )
  }
  

}
