import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DoctorService } from 'src/app/services/doctor.service';
import { AddDoctorComponent } from '../add-doctor/add-doctor.component';

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.css']
})
export class ViewDoctorComponent implements OnInit {

 

  displayedColumns:string[]=['doctorId','doctorName','specialization','doctorPhone','doctorEmail'];
  dataSource:any;
  constructor(
    public dialog:MatDialog,
    public doctorService:DoctorService
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
  }
  addDoctor():void{
    this.dialog.open(AddDoctorComponent,{
      width:'50%',
      height:'60%'
    })
  }

}
