import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackPayment } from './back-payment';

@Injectable({
  providedIn: 'root'
})
export class BackpaymentService {
    private baseURL = "http://localhost:8080/backpayment/list";


  constructor(private httpClient:HttpClient) { }
  getBackPaymentList():Observable<BackPayment[]>{
    return this.httpClient.get<BackPayment[]>(`${this.baseURL}`);
  }
  createBackPayment(backPayment:BackPayment):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,backPayment);
  }
  getbackPaymentById(id:number):Observable<BackPayment>{
    return this.httpClient.get<BackPayment>(`${this.baseURL}/${id}`);
  }
  updateBackPayment(id:number, backPayment:BackPayment):Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,backPayment);
  }
  deleteBackPayment(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
