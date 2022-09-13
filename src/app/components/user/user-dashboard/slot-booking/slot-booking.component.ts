import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Slot } from 'src/app/class/slot';
import { DoctorService } from 'src/app/services/doctor.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { PaymentComponent } from './payment/payment.component';

@Component({
  selector: 'app-slot-booking',
  templateUrl: './slot-booking.component.html',
  styleUrls: ['./slot-booking.component.css']
})
export class SlotBookingComponent implements OnInit {

  slot:Slot = new Slot();
  today:Date = new Date();
  constructor(public matDialogRef:MatDialogRef<SlotBookingComponent>,
    @Inject(MAT_DIALOG_DATA) data:any,
    private userService:UserService,
    private doctorService:DoctorService,
    private matDialog:MatDialog,
    ) {
    matDialogRef.disableClose = true;
    this.slot.doctorId = data.doctorId;
    this.userService.getUserById(data.userId).subscribe(
      (user)=>{
        this.slot.user = user;
      },
      (error)=>{
        console.log(error);
        
      });
      this.doctorService.getDoctorById(data.doctorId).subscribe(
        (doctor)=>{
          this.slot.doctor = doctor;
        },
        (error)=>{
          console.log(error);
          
        }
      )
   }

  ngOnInit(): void {
    
  }


  isNumber(event:any){
    if (( (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) && event.keyCode !=8) {
			event.preventDefault();
		} 
  }
  onBook(){
    if(this.slot.patientName=='' || this.slot.patientName == null ||
    this.slot.patientAge==null || this.slot.patientPhone == null ||
    this.slot.slotDate == null || this.slot.symptoms==null ||
    this.slot.symptoms == ''
    ){
      Swal.fire("Empty fields","Please fill all required fields",'info');
      return;
    }
    console.log(this.slot);
    this.matDialog.open(PaymentComponent,{
      width:'30%',
      height:'60%',
        data:{
          slot:this.slot,
        }
    })
  }
  

}
