import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Doctor } from 'src/app/class/doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-doctor',
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.css']
})
export class UpdateDoctorComponent implements OnInit {

  specializationList:string[]=["Pathology","Neurology","Pathology","Psychiatry","Pediatrics","Surgery","Anesthesiology","Ophthalmology"];
 
  doctorList:any;
  constructor(public dialogRef:MatDialogRef<UpdateDoctorComponent>,
    private doctorService:DoctorService,
    ) { 
      dialogRef.disableClose=true;
      this.getDoctorList();
    }
    getDoctorList(){
      this.doctorService.getDoctorList().subscribe(
        (data)=>{
          console.log(data);
          this.doctorList = data;
        },
        (error)=>{
          console.log(error);
          
        }
      )
    }


    public doctor:Doctor = new Doctor();
  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  
  }

  isNumber(event:any){
    const keyCode = event.keyCode;
    if (( (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) && event.keyCode !=8) {
			event.preventDefault();
		} 
  }
  onUpdate(){
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
    this.doctor.doctorEmail==null ||
    this.doctor.doctorImageUrl == null ||
    this.doctor.doctorImageUrl == ''
    ){
      Swal.fire('Empty!!', 'Field must not be empty','warning');
      return;
    }
    for(let doc of this.doctorList){
      if(doc.doctorId==this.doctor.doctorId){
        this.doctorService.updateDoctor(this.doctor).subscribe(
          data=>{
            Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, Update it!'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  'Updated!',
                  'Your doctor details has been updated.',
                  'success'
                )
              }
            })
          },
          error=>{
            console.log(error);
            Swal.fire('Error!!', 'Something went wrong','error');
          }
        )
        return;
      }
    }
      Swal.fire("Match not found",'Entered pharmacy id does not exist!','warning');
      return;
  }
}
