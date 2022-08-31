import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Slot } from 'src/app/class/slot';
import { DoctorService } from 'src/app/services/doctor.service';
import { SlotService } from 'src/app/services/slot.service';
import { UserService } from 'src/app/services/user.service';
import { PaymentComponent } from './payment/payment.component';

@Component({
  selector: 'app-slot-booking',
  templateUrl: './slot-booking.component.html',
  styleUrls: ['./slot-booking.component.css']
})
export class SlotBookingComponent implements OnInit {

  slot:Slot = new Slot();
  constructor(public matDialogRef:MatDialogRef<SlotBookingComponent>,
    @Inject(MAT_DIALOG_DATA) data:any,
    private slotService:SlotService,
    private userService:UserService,
    private doctorService:DoctorService,
    private matDialog:MatDialog
    ) {
    matDialogRef.disableClose = true;
    this.slot.doctorId = data.doctorId;
    this.userService.getUserById(data.userId).subscribe(
      (user)=>{
        this.slot.user = user;
        console.log(user);
        
      },
      (error)=>{
        console.log(error);
        
      });
      this.doctorService.getDoctorById(data.doctorId).subscribe(
        (doctor)=>{
          this.slot.doctor = doctor;
          console.log(doctor);
        },
        (error)=>{
          console.log(error);
          
        }
      )
   }

  ngOnInit(): void {
  }

  isNumber(event:any){
    const keyCode = event.keyCode;
    if (( (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) && event.keyCode !=8) {
			event.preventDefault();
		} 
  }
  onBook(){
    console.log(this.slot);
    this.matDialog.open(PaymentComponent,{
      width:'30%',
      height:'60%',
        data:{
          slot:this.slot,
        }
    })
  }

  // onPay(){
  //   console.log(this.slot);
  //   this.slotService.createSlot(this.slot).subscribe(
  //     (data)=>{
  //       console.log(data);
  //     },
  //     (error)=>{
  //       console.log(error);
  //     }
  //   )
  // }
  

}
