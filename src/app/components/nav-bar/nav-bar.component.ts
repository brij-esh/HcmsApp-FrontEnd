import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isVisible!:boolean;
  constructor(public adminService:AdminService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }


  logout(){
    this.adminService.isLogin = true;
    console.log(this.adminService.isLogin);
    
  }
  login(){
    this.adminService.isLogin = false;
    console.log(this.adminService.isLogin);
  }

}
