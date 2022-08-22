<<<<<<< HEAD
import { HttpClient, HttpParams } from '@angular/common/http';
=======
import { HttpClient } from '@angular/common/http';
>>>>>>> d4f2c7b45e76271129a55b4e337cd7f35cdf5383
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Slot } from '../class/slot';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  public baseUrl = environment.apiBaseUrl;

  slots!:number;
  constructor(public http:HttpClient) {
  
   }


<<<<<<< HEAD
  public getSlotCount(doctorId:string,slotDate:any):Observable<number>{
    console.log(slotDate);
    
    return this.http.get<number>(`${this.baseUrl}/slot/get-slot-count/${doctorId}?slotDate=${slotDate}`);
=======
  public getSlotCount(doctorId:string,slotDate:Date):Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/slot/get-slot-count/${doctorId}/${slotDate}`);
>>>>>>> d4f2c7b45e76271129a55b4e337cd7f35cdf5383
  }

  public getSlotList():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/slot/get-slot-list`);
  }

  public getSlot(slotId:string):Observable<Slot>{
    return this.http.get<Slot>(`${this.baseUrl}/slot/get-slot/${slotId}`);
  }

  public getSlotPrescription(slotId:string):Observable<string>{
    return this.http.get<string>(`${this.baseUrl}/download/${slotId}`,{
      reportProgress: true,
    }
    );
  }
}
