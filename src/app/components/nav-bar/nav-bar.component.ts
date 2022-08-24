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
  isLog!:boolean;
  constructor(public adminService:AdminService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }

  go(){
    this.router.navigate(['/admin-login']);
  }

  login(){
      this.isLog = true;
      return this.isLog;
  }
  logout(){
    this.isLog = false;
    window.localStorage.clear();
    this.go();
    console.log(this.isLog);
    return this.isLog;
  }

}
