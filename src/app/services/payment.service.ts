import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from '../class/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  public createPayment(payment:Payment):Observable<Payment>{
    return this.http.post<Payment>(`${this.baseUrl}/payment/`,payment);
  }
}