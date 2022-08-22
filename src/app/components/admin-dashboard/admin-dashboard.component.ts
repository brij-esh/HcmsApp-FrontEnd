import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Doctor } from 'src/app/class/doctor';
import { Slot } from 'src/app/class/slot';
import { DoctorService } from 'src/app/services/doctor.service';
import { SlotService } from 'src/app/services/slot.service';
import Swal from 'sweetalert2';
import { AddDoctorComponent } from './doctor/add-doctor/add-doctor.component';
import { DeleteDoctorComponent } from './doctor/delete-doctor/delete-doctor.component';
import { UpdateDoctorComponent } from './doctor/update-doctor/update-doctor.component';
import { AddPharmacyComponent } from './pharmacy/add-pharmacy/add-pharmacy.component';
import { DeletePharmacyComponent } from './pharmacy/delete-pharmacy/delete-pharmacy.component';
import { UpdatePharmacyComponent } from './pharmacy/update-pharmacy/update-pharmacy.component';
import { ViewSlotComponent } from './view-slot/view-slot.component';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

 
  doctor:Doctor = new Doctor();
  slot:Slot = new Slot();
  doctorList:any;

  doctorId!:string;
  slotDate!:Date;

  constructor(public dialog:MatDialog,
    private doctorService:DoctorService,
    private slotService:SlotService,
    private datePipe:DatePipe,
    ) { 
      this.getDoctorList();
    }

  ngOnInit(): void {
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


  // Doctor Module-----------------------------------------
addDoctor(): void {
  this.dialog.open(AddDoctorComponent,{
    width:'50%',
    height:'60%'
  });
}
updateDoctor(): void {
  this.dialog.open(UpdateDoctorComponent,{
    width:'50%',
    height:'60%'
  });
}
deleteDoctor(): void {
  this.dialog.open(DeleteDoctorComponent,{
    width:'40%',
    height:'40%'
  });
}

// Pharmacy module---------------------------------------
addPharmacy(): void {
  this.dialog.open(AddPharmacyComponent,{
    width:'50%',
    height:'60%'
  });
}
updatePharmacy():void{
  this.dialog.open(UpdatePharmacyComponent,{
    width:'50%',
    height:'60%',
  });
}
deletePharmacy():void{
  this.dialog.open(DeletePharmacyComponent,{
    width:'40%',
    height:'40%'
  })
}

// View Slot module---------------------
  viewSlot(){
    console.log(this.doctorId);
    console.log(this.slotDate);

    if(this.doctorId=='' || this.doctorId == null || this.slotDate ==null){
      Swal.fire("Empty fields!","Fields must not be empty",'warning');
      return;
    }

    console.log(this.datePipe.transform(this.slotDate,"yyyy-MM-dd"));
<<<<<<< HEAD
    this.slotService.getSlotCount(this.doctorId,this.datePipe.transform(this.slotDate,"yyyy-MM-dd")).subscribe(
=======
    this.slotService.getSlotCount(this.doctorId,this.slotDate).subscribe(
>>>>>>> d4f2c7b45e76271129a55b4e337cd7f35cdf5383
      (data)=>{
        console.log(data);
        this.dialog.open(ViewSlotComponent,{
          width:'40%',
          height:'30%',
          data:{
            slotNumber:data,
            doctorId:this.doctorId,
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
