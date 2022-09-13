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

  specializationList:string[]=["Pathology","Neurology","Psychiatry","Pediatrics","Surgery","Anesthesiology","Ophthalmology","Dermatology"];

  doctorList!:any;

  constructor(public dialogRef:MatDialogRef<AddDoctorComponent>,
    private doctorService:DoctorService,
    ) { 
      dialogRef.disableClose = true;
      this.getDoctorList();
    }

    public doctor :Doctor =  new Doctor();
  ngOnInit(): void {
    this.getDoctorList();
    
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
  isNumber(event:any){
    if (( (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) && event.keyCode !=8) {
			event.preventDefault();
		} 
  }

  onSave(){
    if(this.doctor.doctorName=='' || 
    this.doctor.specialization=='' ||
    this.doctor.doctorPassword=='' ||
    this.doctor.doctorPhone=='' ||
    this.doctor.doctorEmail=='' ||
    this.doctor.doctorName==null || 
    this.doctor.specialization==null ||
    this.doctor.doctorPassword==null ||
    this.doctor.doctorPhone==null ||
    this.doctor.doctorEmail==null ||
    this.doctor.doctorImageUrl == null ||
    this.doctor.doctorImageUrl == ''
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
        Swal.fire('Success!',`${this.doctor.doctorName}'s details saved. For doctor id please refer to doctor list.`,'success',);
        
      },
      error=>{
        console.log(error);
        Swal.fire('Failed!!', 'Something went wrong','error');
        
      }
    )
  }

}
