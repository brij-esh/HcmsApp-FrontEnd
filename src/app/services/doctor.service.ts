import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  doctorList:any;
  private baseUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient,) { 
    this.getDoctorList().subscribe(
      (data)=>{
        this.doctorList = data;
        console.log(data);
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

  public getDoctorList(){
    return this.http.get(`${this.baseUrl}/doctor/get-doctor-list`);
  }


  public addDoctor(doctor:any){
    return this.http.post(`${this.baseUrl}/doctor/`,doctor);
  }
  public updateDoctor(doctor:any){
    return this.http.put(`${this.baseUrl}/doctor/update-doctor`,doctor);
  }

  public deleteDoctor(doctorId:any){
    return this.http.delete(`${this.baseUrl}/doctor/delete-doctor/${doctorId}`,{
      responseType:'text'
    });
  }
}
