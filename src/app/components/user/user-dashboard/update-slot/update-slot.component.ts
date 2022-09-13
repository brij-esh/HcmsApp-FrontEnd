import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Slot } from 'src/app/class/slot';
import { SlotService } from 'src/app/services/slot.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-slot',
  templateUrl: './update-slot.component.html',
  styleUrls: ['./update-slot.component.css']
})
export class UpdateSlotComponent implements OnInit {
  slot:Slot = new Slot();
  slotId:any;
  today:Date = new Date();
  constructor(public matDialogRef:MatDialogRef<UpdateSlotComponent>,
    @Inject(MAT_DIALOG_DATA) data:any,
    private slotService:SlotService,
    ) {
    matDialogRef.disableClose = true;
    this.slotId = data.slotId;
    this.getSlot();
   }

  ngOnInit(): void {
    let today = new Date().toISOString().slice(0,10);
    document.getElementById("dateField")?.setAttribute("min",today);
  }

  getSlot(){
    this.slotService.getSlot(this.slotId).subscribe(
      (data)=>{
        this.slot = data;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  isNumber(event:any){
    if (( (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) && event.keyCode !=8) {
			event.preventDefault();
		} 
  }
  onUpdate(){
    this.slotService.updateSlotByUser(this.slot).subscribe(
      (data)=>{
        Swal.fire("Updated","Slot updated successfully!","success");
      },
      (error)=>{
        console.log(error);
        Swal.fire("Failed","Something went wrong!","error");
      }
    )
  }
}
