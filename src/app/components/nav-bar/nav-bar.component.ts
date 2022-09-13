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
    // TODO document why this method 'ngOnInit' is empty
  
  }


  go(){
    this.router.navigate(['/']);
  }
  logout(){
    this.adminService.isLogin = true;
    this.go();
    
  }
  login(){
    this.adminService.isLogin = false;
  }

}
