import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User = new User();
  userId!:number;
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}
  
   public getUserEmailId(){
    return this.user.userEmailId;
   }

  public createUser(user: any) {
    return this.http.post(`${this.baseUrl}/user/signup`, user);
  }
  public loginUser(user: any) {
    this.user = user;
    return this.http.post(`${this.baseUrl}/user/login`, user);
  }

  public getUserByEmailId(userEmailId:string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/get-user/${userEmailId}`);
  }

  public getUserById(userId:any):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/user/get-user-by-id/${userId}`);
  }

}
