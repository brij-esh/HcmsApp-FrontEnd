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
      this.adminService.isVisible = true;
    }

  ngOnInit(): void {
    this.getPharmacyList();
  }

  addPharmacy():void{
    this.dialog.open(AddPharmacyComponent,{
      width:'50%',
      height:'60%'
    }).afterClosed().subscribe(
      (result)=>{
        this.ngOnInit();
      },
      (error)=>{
        console.log(error);
        
      })
  }

  getPharmacyList(){
    this.pharmacyService.getPharmacyList().subscribe(
      (data)=>{
        this.dataSource = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
