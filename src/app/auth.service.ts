import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { tokenNotExpired } from 'angular2-jwt';
import decode from 'jwt-decode';

import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public getToken():string {
    return localStorage.getItem('token');
  }
  // public isAuthenticated():boolean{
  //   const token = this.getToken();
  //   return tokenNotExpired(null,token);
  // }
private AUTH_API = "http://localhost:8080/auth/"
  constructor(private http: HttpClient) { }
login(username:String, password:String): Observable<any>{
  return this.http.post(`${this.AUTH_API+"signin"}`,{
    username,
    password
    }, httpOptions);
  }
}
