import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public login:AdminService) { }

<<<<<<< HEAD
  ngOnInit(): void {}
=======
  ngOnInit(): void {
  }
>>>>>>> d4f2c7b45e76271129a55b4e337cd7f35cdf5383

  public logout(){
    this.login.logout();
  }
}
