import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/class/admin';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  admin:Admin = new Admin();
  constructor(public adminService:AdminService, private router:Router) { }

  ngOnInit(): void {
    this.adminService.isVisible = false;
  }
  
  go(){
    this.router.navigate(['/admin-dashboard']);
  }
  adminLogin(){
    this.adminService.adminLoginFromRemote(this.admin).subscribe(
      data=>{
        console.log("response received");
        this.adminService.isLogin = false;
        this.go();
      },
      error=>{
        console.log("Exception occurred");
        Swal.fire('Wrong credentials!','Please enter valid credentials','warning');
      }
    )
  }
}
