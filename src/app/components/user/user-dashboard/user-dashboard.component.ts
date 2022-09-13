import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { SlotService } from 'src/app/services/slot.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { SlotBookingComponent } from './slot-booking/slot-booking.component';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UpdateSlotComponent } from './update-slot/update-slot.component';
import { Doctor } from 'src/app/class/doctor';
import { Slot } from 'src/app/class/slot';
import { ViewSlotComponent } from '../../admin-dashboard/view-slot/view-slot.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  displayedColumns:string[]=['slotId','doctorId','patientName','patientAge','slotDate','symptoms','prescription','action'];
  userEmailId!:string;
  userId!:number;
  user!:any;
  slotList:any;
  doctorList!:any;
  term!:any;


  doctor:Doctor = new Doctor();
  slot:Slot = new Slot();
  slotSize!:number;
  doctorId!:string;
  slotDate!:Date;
  today: Date = new Date();
  constructor(private userService:UserService,
    private slotService:SlotService,
    private doctorService:DoctorService,
    private matDialog:MatDialog,
    private adminService:AdminService,
    private router:Router,
    private datePipe:DatePipe,
    ) { 
      this.getDoctorList();
      this.userEmailId = this.userService.getUserEmailId();
      this.getUserId();
      this.adminService.isVisible = true;
      if(this.adminService.isLogin==true){
        window.stop();
        this.go();
      }
    }
    
    
    ngOnInit(): void {
      this.getUserId();
      console.log(this.userId + "ngOnInit called");
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
    }).afterClosed().subscribe(
      (result)=>{
        this.ngOnInit();
      },
      (error)=>{
        console.log(error);
        
      })
  }

  updateSlot(slotId:any){
    this.matDialog.open(UpdateSlotComponent,
      {
        height:'60%',
        width:'60%',
        data:{
          slotId:slotId,
        }
      }).afterClosed().subscribe(
        (result)=>{
          this.getSlotList();
        },
        (error)=>{
          console.log(error);
          
        }
      )
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
        this.getSlotList();
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  

  getSlotList(){
    console.log(this.userId+" get slot list");
    this.slotService.getSlotListByUserId(this.userId).subscribe(
      (data)=>{
        this.slotList = data;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

  deleteSlot(slotId:string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.slotService.deleteSlotById(slotId).subscribe(
          (data)=>{
            this.ngOnInit();
          },
          (error)=>{
            console.log(error);
            Swal.fire("Failed","Something went wrong!!","error");
            return;
          }
        )
        Swal.fire(
          'Cancelled!',
          'Your slot has been cancelled.',
          'success'
        )
      }
    })
    
  }

  viewSlot(){
    this.doctorService.getSlotSize(this.doctorId).subscribe(
      (data)=>{
        this.slotSize = data;
      },
      (error)=>{
        console.log(error);
      }
    )
    if(this.doctorId =='' || this.doctorId == null || this.slotDate == null){
      Swal.fire("Empty fields!","Fields must not be empty",'warning');
      return;
    }
    console.log(this.datePipe.transform(this.slotDate,"yyyy-MM-dd"));
    this.slotService.getSlotCount(this.doctorId,this.datePipe.transform(this.slotDate,"yyyy-MM-dd")).subscribe(
      (data)=>{
        this.matDialog.open(ViewSlotComponent,{
          width:'40%',
          height:'30%',
          data:{
            slotNumber:data,
            doctorId:this.doctorId,
            slotSize:this.slotSize,
          }
        })
        
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error","Something went wrong",'error');
      }
    )
  }

}
