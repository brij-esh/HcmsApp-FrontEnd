import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Doctor } from 'src/app/class/doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {


  doctorList!:any;
  constructor(public dialogRef:MatDialogRef<AddDoctorComponent>,
    private doctorService:DoctorService,
    ) { 
      dialogRef.disableClose = true;
      this.getDoctorList();
    }

    public doctor :Doctor =  new Doctor();
  ngOnInit(): void {
  }


  getDoctorList(){
    this.doctorService.getDoctorList().subscribe(
      (data)=>{
        this.doctorList = data;
        // console.log(data);
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  isNumber(event:any){
    const keyCode = event.keyCode;
    if (( (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) && event.keyCode !=8) {
			event.preventDefault();
		} 
  }

  onSave(){
    if(this.doctor.doctorId=='' || 
    this.doctor.doctorName=='' || 
    this.doctor.specialization=='' ||
    this.doctor.doctorPassword=='' ||
    this.doctor.doctorPhone=='' ||
    this.doctor.doctorEmail=='' ||
    this.doctor.doctorId==null || 
    this.doctor.doctorName==null || 
    this.doctor.specialization==null ||
    this.doctor.doctorPassword==null ||
    this.doctor.doctorPhone==null ||
    this.doctor.doctorEmail==null
    ){
      Swal.fire('Empty!','Fields must not be empty!','warning');
      return;
    }
    for(let doctor of this.doctorList){
      if(doctor.doctorId == this.doctor.doctorId){
        Swal.fire("Already Exist!","Please try again with other doctor id!",'warning');
        return;
      }
    }
    this.doctorService.addDoctor(this.doctor).subscribe(
      data=>{
        console.log(data);
        Swal.fire('Success!','Doctor Details Saved','success');
        
      },
      error=>{
        console.log(error);
        Swal.fire('Failed!!', 'Something went wrong','error');
        
      }
    )
  }

}
