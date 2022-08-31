import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { SlotService } from 'src/app/services/slot.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {

  prescription!:string;
  slotList:any;
  slotId!:string;
  doctorId!:string;
  constructor(private slotService:SlotService,
    private router : Router,
    private adminService:AdminService,
    private doctorService:DoctorService
    ) {
      this.doctorId = this.doctorService.doctorId;
      console.log(this.doctorId);
      
    }

  ngOnInit(): void {
    this.getSlotListByDoctorId(this.doctorId);
    this.adminService.isVisible = true;
    if(this.adminService.isLogin==true){
      window.stop();
      this.goto();
    }
  }


  goto(){
    this.router.navigate(['/home']);
    Swal.fire("Logged Out!","You were logged out, Please login again. Thank You", 'warning');
  }

  go(){
    this.router.navigate(['/doctor-dashboard']);
  }
  onUpload(){
    this.slotService.updateSlot(this.slotId,this.prescription);
  }

  getSlotListByDoctorId(doctorId:string){
    this.slotService.getSlotListByDoctorId(doctorId).subscribe(
      (data)=>{
        this.slotList = data;
        console.log(data);
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

  // getSlotList(){
  //   this.slotService.getSlotList().subscribe(
  //     (data)=>{
  //       this.slotList = data;
  //       console.log(data);
        
  //     },
  //     (error)=>{
  //       console.log(error);
        
  //     }
  //   )
  // }

  displayStyle  = 'none';

  openPopup(data:any){
    this.displayStyle = "block";
    this.prescription = data.prescription;
    this.slotId = data.slotId;
  }
  close(){
    this.displayStyle = "none";
  }

  upload()
  {
    this.slotService.updateSlot(this.slotId,this.prescription).subscribe(data=>
      {
        console.log(data);
        alert("Successfully updated");
        this.go();
      })
  }
}
