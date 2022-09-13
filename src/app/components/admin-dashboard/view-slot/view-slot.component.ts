import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-slot',
  templateUrl: './view-slot.component.html',
  styleUrls: ['./view-slot.component.css']
})
export class ViewSlotComponent implements OnInit {

  constructor(public dialogRef : MatDialogRef<ViewSlotComponent>,
    @Inject (MAT_DIALOG_DATA) public data:any,
    ) { }
    
    ngOnInit(): void {
   }

  


}
