import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Slot } from 'src/app/class/slot';
import { SlotService } from 'src/app/services/slot.service';
import { ViewPrescriptionComponent } from './view-prescription/view-prescription.component';

@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.css']
})
export class PatientLoginComponent implements OnInit {



  slot:Slot = new Slot();

  // slotId = "b11v0";

  constructor(public slotService:SlotService,
    public matdialog:MatDialog
    ) {
    this.getSlot();
   }

  ngOnInit(): void {
  }

  getSlot(){
    this.slotService.getSlot("ram12").subscribe(
      (data)=>{
        this.slot = data;
        console.log(data);
        
      },
      (error)=>{
        console.log(error);
        
      }
    )

  }
  viewPrescription(prescription:any){
    this.matdialog.open(ViewPrescriptionComponent,{
      width:'40%',
      height:'40%',
      data:{
        prescription:prescription,
      }
    }
      )
  }


}
