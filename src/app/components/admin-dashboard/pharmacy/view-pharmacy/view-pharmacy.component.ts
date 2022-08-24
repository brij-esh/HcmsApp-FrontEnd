import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import { AddPharmacyComponent } from '../add-pharmacy/add-pharmacy.component';

@Component({
  selector: 'app-view-pharmacy',
  templateUrl: './view-pharmacy.component.html',
  styleUrls: ['./view-pharmacy.component.css']
})
export class ViewPharmacyComponent implements OnInit {


  displayedColumns: string[] = ['pharmacyId', 'pharmacyName', 'pharmacyOwner','pharmacyPhone','pharmacyEmail'];

  dataSource:any;
  constructor(
    public dialog:MatDialog,
    private pharmacyService:PharmacyService,
    private adminService:AdminService
    ) { 
      this.getPharmacyList();
    }

  ngOnInit(): void {
    this.adminService.isVisible = true;
  }

  addPharmacy():void{
    this.dialog.open(AddPharmacyComponent,{
      width:'50%',
      height:'60%'
    })
  }

  getPharmacyList(){
    this.pharmacyService.getPharmacyList().subscribe(
      (data)=>{
        console.log(data);
        this.dataSource = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
