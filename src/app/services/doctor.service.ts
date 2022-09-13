import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Doctor } from '../class/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  doctorList:any;
  doctorId:any;
  private baseUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient,) { 
    this.getDoctorList().subscribe(
      (data)=>{
        this.doctorList = data;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

  public getDoctorList(){
    return this.http.get(`${this.baseUrl}/doctor/get-doctor-list`);
  }

  public getSlotSize(doctorId:string):Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/doctor/get-slot-size/${doctorId}`);
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

  public loginDoctorFromRemote(doctorData:Doctor):Observable<Doctor>{
    this.doctorId = doctorData.doctorId;
    return this.http.post<Doctor>(`${this.baseUrl}/doctor/login`,doctorData)
  }

  public getDoctorById(doctorId:any):Observable<Doctor>{
    return this.http.get<Doctor>(`${this.baseUrl}/doctor/get-doctor/${doctorId}`)
  }
}
