import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { SlotService } from 'src/app/services/slot.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pharmacy-dashboard',
  templateUrl: './pharmacy-dashboard.component.html',
  styleUrls: ['./pharmacy-dashboard.component.css']
})
export class PharmacyDashboardComponent implements OnInit {

  displayedColumns:string[]=['slotId','doctorId','patientName','patientAge','slotDate','symptoms','prescription'];
  slotList:any;
  constructor(private slotService:SlotService,
    private adminService:AdminService,
    private router:Router
    ) {
    this.getSlotList();
    this.adminService.isVisible = true;
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
}
