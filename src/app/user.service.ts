import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from './role';
import { Users } from './users';


// const AUTH_API = 'http://localhost:8080/api/auth/'
 const httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
 };
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private httpClient: HttpClient) { }
  private baseURL="http://localhost:8080/user/users";
  getUsersList():Observable<Users[]>{
    return this.httpClient.get<Users[]>(`${this.baseURL}`)
  }

  createUser(user:Users):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,user);
  }
   updateUser(id: number, user: Users): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, user);
  }
  getUsersById(id: number): Observable< Users>{
    return this.httpClient.get<Users>(`${this.baseURL}/${id}`);
  }


  deleteUser(userId: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${userId}`);
  }
}


