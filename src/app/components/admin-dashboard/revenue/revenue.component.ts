import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit {

  displayedColumns: string[] = ['sNo','cardHolderName','cardType','cardNo','expiry','amount','userId','paymentDate'];
  dataSource: any;
  startDate!: Date;
  endDate!: Date;
  totalAmount!:number;
  calculated:boolean = false;
  sDate!:any;
  eDate!:any;
  constructor(private paymentService:PaymentService,
    private datePipe : DatePipe
    ) {
    this.getPaymentList();
   }

  ngOnInit(): void {
    this.getList();
  }
  getList():any{
    return this.dataSource;
  }

  getTotalAmount(){
    this.totalAmount = 0;
    for(let data of this.dataSource){
      this.totalAmount = this.totalAmount + data.amount;
    }
    console.log(this.totalAmount);
    
  }


  getPaymentList(){
    this.paymentService.getPaymentList().subscribe(
      (data)=>{
        this.dataSource = data;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

  generate(){
    if(this.startDate == null || this.endDate==null){
      Swal.fire("Empty date fields!","Please provide date range!",'warning');
      return;
    }
    this.sDate = this.datePipe.transform(this.startDate,"yyyy-MM-dd");
    this.eDate = this.datePipe.transform(this.endDate,"yyyy-MM-dd");
    console.log(this.datePipe.transform(this.startDate,"yyyy-MM-dd"));
    this.paymentService.getPaymentListByDateRange(this.datePipe.transform(this.startDate,"yyyy-MM-dd"),this.datePipe.transform(this.endDate,"yyyy-MM-dd")).subscribe(
      (data)=>{
        this.dataSource = data;
        this.getTotalAmount();
        this.calculated = true;
        this.ngOnInit();
        console.log(data);
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

}
