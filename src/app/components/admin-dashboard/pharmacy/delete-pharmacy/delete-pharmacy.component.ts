import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Pharmacy } from 'src/app/class/pharmacy';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-delete-pharmacy',
  templateUrl: './delete-pharmacy.component.html',
  styleUrls: ['./delete-pharmacy.component.css']
})
export class DeletePharmacyComponent implements OnInit {

  pharmacyList:any
  constructor(public dialogRef:MatDialogRef<DeletePharmacyComponent>,
    private pharmacyService:PharmacyService,
    ) { 
      dialogRef.disableClose=true;
      this.getPharmacyList();
    }

    public pharmacy:Pharmacy = new Pharmacy();
    
  ngOnInit(): void {
  }
  getPharmacyList(){
    this.pharmacyService.getPharmacyList().subscribe(
      (data)=>{
        console.log(data);
        this.pharmacyList = data;
      },
      (error)=>{
        console.log(error);
        Swal.fire("Failed","Something went wrong",'error');
      }
    )
  }

  onDelete(pharmacy:Pharmacy){
    if(this.pharmacy.pharmacyId=='' || this.pharmacy.pharmacyId==null
    ){
      Swal.fire('Empty!!', 'Field must not be empty','warning');
      return;
    }
    for(let pharm of this.pharmacyList){
      if(pharm.pharmacyId==this.pharmacy.pharmacyId){
        this.pharmacyService.deletePharmacy(this.pharmacy.pharmacyId).subscribe(
          (data)=>{
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
          (error)=>{
            console.log(error);
            Swal.fire('Failed!!', 'Something went wrong','error');
          }
        )
        return;
      }
    }
      Swal.fire("Match not found",'Entered pharmacy id does not exist!','warning');
    return;
  }
}
