
import { HttpClient  } from '@angular/common/http';

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


   public createSlot(slot:Slot):Observable<Slot>{
    return this.http.post<Slot>(`${this.baseUrl}/slot/create-slot`,slot);
   }


  public getSlotCount(doctorId:string,slotDate:any):Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/slot/get-slot-count/${doctorId}?slotDate=${slotDate}`);
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

  public bookDoctor(slotId:string, doctorId:string):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/slot/${slotId}/doctor/${doctorId}`,slotId);
  }

  public bookUser(slotId:string, userId:any):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/slot/${slotId}/doctor/${userId}`,slotId);
  }

  public updateSlot(slotId:string, prescription:string):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/slot/update-slot/${slotId}`,prescription);
  }

  public updateSlotByUser(slot:any):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/slot/update-slot-by-user`,slot);
  }

  public updateSlotStatus(slotId:string, status:boolean):Observable<Slot>{
    return this.http.put<Slot>(`${this.baseUrl}/slot/updateSlotStatus/${slotId}`,status);
  }

  public getSlotListByUserId(userId:number):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/slot/get-slot-list-by-user-id/${userId}`);
  }

  public getSlotListByDoctorId(doctorId:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/slot/get-slot-list-by-doctor-id/${doctorId}`);
  }

  public deleteSlotById(slotId:any){
    return this.http.delete(`${this.baseUrl}/slot/delete-by-slot-id/${slotId}`,{
      responseType:'text'});
  }
}
