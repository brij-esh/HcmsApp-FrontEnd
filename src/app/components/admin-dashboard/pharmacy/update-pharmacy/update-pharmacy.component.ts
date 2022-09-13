import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Pharmacy } from 'src/app/class/pharmacy';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-pharmacy',
  templateUrl: './update-pharmacy.component.html',
  styleUrls: ['./update-pharmacy.component.css']
})
export class UpdatePharmacyComponent implements OnInit {

  pharmacyList:any;
  constructor(public dialogRef:MatDialogRef<UpdatePharmacyComponent>,
    private pharmacyService:PharmacyService,
    ) { 
      dialogRef.disableClose=true;
      this.getPharmacyList();
    }

    public pharmacy:Pharmacy= new Pharmacy();
  ngOnInit(): void {
    console.log("list of pharmacy",this.pharmacyList);
  }

  getPharmacyList(){
    this.pharmacyService.getPharmacyList().subscribe(
      (data)=>{
        this.pharmacyList = data;
      },
      (error)=>{
        console.log(error);
        Swal.fire("Failed","Something went wrong",'error');
      }
    )
  }

  isNumber(event:any){
    if (( (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) && event.keyCode !=8) {
			event.preventDefault();
		} 
  }
  onUpdate(pharmacy:Pharmacy){
    if(this.pharmacy.pharmacyId=='' || 
    this.pharmacy.pharmacyName=='' || 
    this.pharmacy.pharmacyOwner=='' ||
    this.pharmacy.pharmacyPassword=='' ||
    this.pharmacy.pharmacyPhone=='' ||
    this.pharmacy.pharmacyEmail=='' ||
    this.pharmacy.pharmacyId==null || 
    this.pharmacy.pharmacyName==null || 
    this.pharmacy.pharmacyOwner==null ||
    this.pharmacy.pharmacyPassword==null ||
    this.pharmacy.pharmacyPhone==null ||
    this.pharmacy.pharmacyEmail==null
    ){
      Swal.fire('Empty!!', 'Field must not be empty','warning');
      return;
    }
    for(let pharm of this.pharmacyList){
      if(pharm.pharmacyId==this.pharmacy.pharmacyId){
        this.pharmacyService.updatePharmacy(this.pharmacy).subscribe(
          (data)=>{
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
                  'Your pharmacy has been updated.',
                  'success'
                )
              }
            })
          },
          (error)=>{
            Swal.fire('Error!!', 'Something went wrong','error');
          }
        )
        return;
      }
    }
      Swal.fire("Match not found",'Entered pharmacy id does not exist!','warning');
  }
}
