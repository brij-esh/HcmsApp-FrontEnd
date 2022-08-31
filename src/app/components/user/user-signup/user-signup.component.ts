import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  user:User = new User();
  constructor(private userService:UserService,private router:Router
  ) { }

  ngOnInit(): void {
  }

  
  onFormSubmit()
  {
    this.user.user = 0;
    if(
      this.user.password == null || this.user.password == '' ||
      this.user.userAge ==null ||
      this.user.userEmailId == null || this.user.userEmailId == '' ||
      this.user.userFirstName == null ||  this.user.userFirstName == '' ||
      this.user.userLastName == null ||  this.user.userLastName == '' ||
      this.user.userPhone == null || this.user.userPhone == ''
    )
    {
      Swal.fire("Empty fields","Please fill all required fields",'warning');
    }
    else
    {
      this.userService.createUser(this.user).subscribe(
        (data)=>
        {
          console.log(data);
          this.router.navigate(['/user-login'])
          Swal.fire('success',
            'Successfully Registered',
            'success',
          );
        },
        (error)=>
        {
          console.log(error);
          Swal.fire("Failed!","Something went wrong","error");
        }
      );
      
    }
  }

}
