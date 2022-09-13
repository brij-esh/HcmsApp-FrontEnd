import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/class/doctor';
import { Slot } from 'src/app/class/slot';
import { AdminService } from 'src/app/services/admin.service';
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
  
  today:Date = new Date();
 
  doctor:Doctor = new Doctor();
  slot:Slot = new Slot();
  doctorList:any;
  slotSize!:number;

  doctorId!:string;
  slotDate!:Date;

  constructor(public dialog:MatDialog,
    private doctorService:DoctorService,
    private slotService:SlotService,
    private datePipe:DatePipe,
    private adminService:AdminService,
    private router : Router
    ) { 
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
    height:'80%'
  });
}
updateDoctor(): void {
  this.dialog.open(UpdateDoctorComponent,{
    width:'50%',
    height:'80%'
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
        this.dialog.open(ViewSlotComponent,{
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
