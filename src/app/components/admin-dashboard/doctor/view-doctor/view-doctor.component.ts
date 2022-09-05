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

 

  displayedColumns:string[]=['doctorId','doctorName','specialization','doctorPhone','doctorEmail','doctorImageUrl'];
  dataSource:any;
  constructor(
    public dialog:MatDialog,
    public doctorService:DoctorService,
    public adminService:AdminService
    ) { 
      this.getDoctorList();
    }

    getDoctorList(){
      this.doctorService.getDoctorList().subscribe(
        (data)=>{
          console.log(data);
          this.dataSource = data;
        },
        (error)=>{
          console.log(error);
          
        }
      )
    }

  ngOnInit(): void {
    this.adminService.isVisible = true;
  }
  addDoctor():void{
    this.dialog.open(AddDoctorComponent,{
      width:'50%',
      height:'60%'
    })
  }

}
