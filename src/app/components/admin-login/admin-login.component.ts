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
  constructor(private adminservice:AdminService, private router:Router) { }

  ngOnInit(): void {
  }
  
  go(){
    this.router.navigate(['/admin-dashboard']);
  }
  adminLogin(){
    console.log(this.admin);
    
    this.adminservice.adminLoginFromRemote(this.admin).subscribe(
      data=>{
        console.log("response recieved");
        // alert("Successfully loggedin");
        this.go();
        this.adminservice.isLog = true;
      },
      error=>{
        console.log("Exception occured");
        Swal.fire('Wrong credentials!','Please enter valid credentials','warning');
      }
    )
  }
}
