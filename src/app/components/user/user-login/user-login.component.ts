import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {


  user:User = new User();
  constructor(public userService: UserService, public router: Router, private adminService:AdminService) { }

  ngOnInit(): void {
  }

  public onFormSubmit() {
    if (this.user.userEmailId == null || this.user.password == null || this.user.userEmailId==null) {
      Swal.fire("Empty fields!", "Please fill all required fields.", 'warning');
    }
    else {
      this.userService.loginUser(this.user).subscribe(
        (data: any) => {
          this.router.navigate(['/user-dashboard']);
          this.adminService.isLogin = false;
          Swal.fire('success',
            'Successfully Logged In',
            'success',
          );
        },
        (error) => {
          console.log(error);
          Swal.fire("Invalid User!", "Please Enter correct Credentials", 'warning');
        }

      );

    }
  }

}
