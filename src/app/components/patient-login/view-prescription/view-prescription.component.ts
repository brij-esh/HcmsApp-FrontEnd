import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-prescription',
  templateUrl: './view-prescription.component.html',
  styleUrls: ['./view-prescription.component.css']
})
export class ViewPrescriptionComponent implements OnInit {


  
  constructor(public matDialogRef:MatDialogRef<ViewPrescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    
    ) { }

  ngOnInit(): void {
  }

}
