import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { AddDoctorComponent } from '../add-doctor/add-doctor.component';

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.css']
})
export class ViewDoctorComponent implements OnInit {

 

  displayedColumns:string[]=['doctorId','doctorName','specialization','doctorPhone','doctorEmail','doctorAddress','slotSize', 'doctorImageUrl'];
  doctorList:any;
  constructor(
    public dialog:MatDialog,
    public doctorService:DoctorService,
    public adminService:AdminService
    ) { 
      this.getDoctorList();
      this.adminService.isVisible = true;
    }

  ngOnInit(): void {
    this.getDoctorList();
  }
  addDoctor():void{
    this.dialog.open(AddDoctorComponent,{
      width:'50%',
      height:'60%'
    }).afterClosed().subscribe(
      (result)=>{
        this.ngOnInit();
      },
      (error)=>{
        console.log(error);
        
      }
    )
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

}
