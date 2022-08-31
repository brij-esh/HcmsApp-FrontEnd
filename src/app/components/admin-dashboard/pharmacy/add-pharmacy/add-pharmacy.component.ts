import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Pharmacy } from 'src/app/class/pharmacy';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-pharmacy',
  templateUrl: './add-pharmacy.component.html',
  styleUrls: ['./add-pharmacy.component.css']
})
export class AddPharmacyComponent implements OnInit {

  pharmacyList!:any;
  public pharmacy:Pharmacy = new Pharmacy();
  constructor(public dialogRef: MatDialogRef<AddPharmacyComponent>,
    private pharmacyService:PharmacyService,
    ) {
    dialogRef.disableClose=true;
    this.getPharmacyList();
   }


  ngOnInit(): void {
  }

  getPharmacyList(){
    this.pharmacyService.getPharmacyList().subscribe(
      (data)=>{
        this.pharmacyList = data;
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
    if(
    this.pharmacy.pharmacyName=='' || 
    this.pharmacy.pharmacyOwner=='' ||
    this.pharmacy.pharmacyPassword=='' ||
    this.pharmacy.pharmacyPhone=='' ||
    this.pharmacy.pharmacyEmail=='' ||
    this.pharmacy.pharmacyName==null || 
    this.pharmacy.pharmacyOwner==null ||
    this.pharmacy.pharmacyPassword==null ||
    this.pharmacy.pharmacyPhone==null ||
    this.pharmacy.pharmacyEmail==null
    ){
      Swal.fire('Empty!','Fields must not be empty!','warning');
      return;
    }

    for(let pharmacy of this.pharmacyList){
      if(pharmacy.pharmacyId == this.pharmacy.pharmacyId){
        Swal.fire("Already Exist!","Please try again with other pharmacy id!",'warning');
        return;
      }
    }


    this.pharmacyService.addPharmacy(this.pharmacy).subscribe(
      data=>{
        console.log(data);
        Swal.fire('Success!','Pharmacy Details Saved. Please refer pharmacy list for pharmacy id','success');
        
      },
      error=>{
        console.log(error);
        Swal.fire('Failed!!', 'Something went wrong','error');
        
      }
    )
  }
  

}
