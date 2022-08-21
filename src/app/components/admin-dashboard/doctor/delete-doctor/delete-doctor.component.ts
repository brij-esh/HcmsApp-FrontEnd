import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Doctor } from 'src/app/class/doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-doctor',
  templateUrl: './delete-doctor.component.html',
  styleUrls: ['./delete-doctor.component.css']
})
export class DeleteDoctorComponent implements OnInit {
  doctorList: any;
  selectedDoctorId: string = '';
  constructor(public dialogRef: MatDialogRef<DeleteDoctorComponent>,
    private doctorService: DoctorService,
  ) {
    dialogRef.disableClose = true;
    this.getDoctorList();
  }
  getDoctorList() {
    this.doctorService.getDoctorList().subscribe(
      (data) => {
        this.doctorList = data;
        console.log(data);

      },
      (error) => {
        console.log(error);

      }
    )
  }

  public doctor: Doctor = new Doctor();
  ngOnInit(): void {
  }

  onDelete(doctor: Doctor) {
    if (this.doctor.doctorId == '' || this.doctor.doctorId == null
    ) {
      Swal.fire('Empty!!', 'Field must not be empty', 'warning');
      return;
    }
    for (let doc of this.doctorList) {
      if (doc.doctorId == this.doctor.doctorId) {
        this.doctorService.deleteDoctor(this.doctor.doctorId).subscribe(
          data => {
            console.log(data);
            Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
              }
            })
          },
          error => {
            console.log(error);
            Swal.fire('Failed!!', 'Something went wrong', 'error');
          }
        )
        return;
      }
    }
    Swal.fire("Match not found", 'Entered doctor id does not exist!', 'warning');
    return;
  }
}
