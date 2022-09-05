import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { SlotService } from 'src/app/services/slot.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { SlotBookingComponent } from './slot-booking/slot-booking.component';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  displayedColumns:string[]=['slotId','doctorId','patientName','patientAge','slotDate','symptoms','prescription'];
  userEmailId!:string;
  userId!:number;
  user!:any;
  slotList:any;
  doctorList!:any;
  term!:any;
  constructor(private userService:UserService,
    private slotService:SlotService,
    private doctorService:DoctorService,
    private matDialog:MatDialog,
    private adminService:AdminService,
    private router:Router
    ) { 
      this.userEmailId = this.userService.getUserEmailId();
      this.getUserId();
      this.getDoctorList();
  }

 
  ngOnInit(): void {
    this.adminService.isVisible = true;
    if(this.adminService.isLogin==true){
      window.stop();
      this.go();
    }
  }


  go(){
    this.router.navigate(['/home']);
    Swal.fire("Logged Out!","You were logged out, Please login again. Thank You", 'warning');
  }

  book(id:any):void{
    this.matDialog.open(SlotBookingComponent,{
      height:'60%',
      width:'60%',
      data:{
        doctorId : id,
        userId : this.userId,
      }
    })
  }

  getDoctorList(){
    this.doctorService.getDoctorList().subscribe(
      (data)=>{
        this.doctorList = data;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

  getUserId(){
    this.userService.getUserByEmailId(this.userEmailId).subscribe(
      (data)=>{
        this.userId = data.id;
        this.getSlotList(this.userId)
        console.log(data);
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  

  getSlotList(userId:number){
    this.slotService.getSlotListByUserId(userId).subscribe(
      (data)=>{
        this.slotList = data;
        console.log(data);
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

}