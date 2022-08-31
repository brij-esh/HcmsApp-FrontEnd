import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../class/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  isLogin:boolean=true;
  isVisible:boolean=true;
  private baseUrl = environment.apiBaseUrl;
  constructor(private httpClient:HttpClient) { }

  adminLoginFromRemote(admin:Admin):Observable<Admin>{
    console.log(admin);
    return this.httpClient.post<Admin>(`${this.baseUrl}/admin/login`,admin);
  }


  


}
