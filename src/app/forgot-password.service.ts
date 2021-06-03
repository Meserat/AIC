import { ConfirmationToken } from './confirmation-token';
import { ForgetPassword } from './forget-password';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
 private baseURL="http://localhost:8080/user/forgot-password";
private resetURl = "http://localhost:8080/user/confirm-reset"
  constructor(private httpClient: HttpClient) { }

  sendEmail(forgetPassword: ForgetPassword):Observable<Object>{
       console.log(forgetPassword);
    return this.httpClient.post(`${this.baseURL}`, forgetPassword);

  }
  getToken(){
    return this.httpClient.get(`${this.resetURl}`);
  }
  confrimToken(resetPasswordToken:ConfirmationToken):Observable<Object>{
    return this.httpClient.post(`${this.resetURl}`,resetPasswordToken);
  }
}
