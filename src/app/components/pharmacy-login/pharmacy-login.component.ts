import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pharmacy } from 'src/app/class/pharmacy';
import { AdminService } from 'src/app/services/admin.service';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pharmacy-login',
  templateUrl: './pharmacy-login.component.html',
  styleUrls: ['./pharmacy-login.component.css']
})
export class PharmacyLoginComponent implements OnInit {
  pharmacy:Pharmacy = new Pharmacy();
  constructor(public pharmacyService:PharmacyService, private router:Router,
    private adminService:AdminService
    ) { }

  ngOnInit(): void {
    this.adminService.isVisible = false;
  }
  
  go(){
    this.router.navigate(['/pharmacy-dashboard']);
  }
  pharmacyLogin(){
    console.log(this.pharmacy);
    
    this.pharmacyService.pharmacyLogin(this.pharmacy).subscribe(
      data=>{
        console.log("response received");
        this.go();
        this.adminService.isLogin = false;
      },
      error=>{
        console.log("Exception occurred");
        Swal.fire('Wrong credentials!','Please enter valid credentials','warning');
      }
    )
  }

}
