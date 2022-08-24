import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-footer-nav-bar',
  templateUrl: './footer-nav-bar.component.html',
  styleUrls: ['./footer-nav-bar.component.css']
})
export class FooterNavBarComponent implements OnInit {

  constructor(public adminService: AdminService) { }

  ngOnInit(): void {

  }

}
