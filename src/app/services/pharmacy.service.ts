import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pharmacy } from '../class/pharmacy';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  pharmacyList:any;
  private baseUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient,) { 
    this.getPharmacyList().subscribe(
      (data)=>{
        this.pharmacyList = data;
      }
    )
  }

  public pharmacyLogin(pharmacy:Pharmacy):Observable<Pharmacy>{
    return this.http.post<Pharmacy>(`${this.baseUrl}/pharmacy/login`,pharmacy);
  }

  public getPharmacyDetails():Observable<Pharmacy>{
    return this.http.get<Pharmacy>(`${this.baseUrl}/pharmacy/get-pharmacy-list`);
  }

  public getPharmacyList():Observable<any>{
    return this.http.get(`${this.baseUrl}/pharmacy/get-pharmacy-list`).pipe(
      (data)=>{
        return data;
      },
      (error)=>{
        console.log('Error! ', error);
        
        return error;
      }
    );
  }

  public addPharmacy(pharmacy:any){
    return this.http.post(`${this.baseUrl}/pharmacy/`,pharmacy);
  }

  public updatePharmacy(pharmacy:any){
    return this.http.put(`${this.baseUrl}/pharmacy/update-pharmacy`,pharmacy);
  }


  public deletePharmacy(pharmacyId:any){
    return this.http.delete(`${this.baseUrl}/pharmacy/delete-pharmacy/${pharmacyId}`,{
      responseType:'text'
    });
  }

}
