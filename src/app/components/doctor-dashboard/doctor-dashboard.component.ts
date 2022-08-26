import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { SlotService } from 'src/app/services/slot.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {

  prescription!:string;
  slotList:any;
  slotId!:string;
  constructor(private slotService:SlotService,
    private router : Router,
    private adminService:AdminService
    ) {}

  ngOnInit(): void {
    this.getSlotList();
    this.adminService.isVisible = false;
  }

  go(){
    this.router.navigate(['/doctor-dashboard']);
  }
  onUpload(){
    this.slotService.updateSlot(this.slotId,this.prescription);
  }

  getSlotList(){
    this.slotService.getSlotList().subscribe(
      (data)=>{
        this.slotList = data;
        console.log(data);
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

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
