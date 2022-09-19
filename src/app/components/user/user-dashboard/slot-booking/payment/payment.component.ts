import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Payment } from 'src/app/class/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { SlotService } from 'src/app/services/slot.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  slot!:any;
  payment:Payment = new Payment();
  constructor(private dialogRef:MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) data:any,
    private slotService:SlotService,
    private paymentService:PaymentService,
    private router:Router
    ) { 
      this.slot = data.slot;
    }

  ngOnInit(): void {
    // no use
  }

  book(){
    this.slotService.createSlot(this.slot).subscribe(
      (data)=>{
        Swal.fire("Payment Done!","Your Slot is booked successfully",'success');
      },
      (error)=>{
        console.log(error);
        Swal.fire("Failed","Something went wrong. Try again!",'error');
      }
    )
  }
  public onPay(): void {
    this.payment.userId = this.slot.user.id;
    this.payment.doctorId = this.slot.doctorId;
    this.paymentService.createPayment(this.payment).subscribe(
     (response: Payment)=>{
       this.book();
     },
     (error: HttpErrorResponse)=>{
       alert(error.message);
     }
     );
    }

}
