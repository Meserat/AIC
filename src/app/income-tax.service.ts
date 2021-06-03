import { IncomeTax } from './income-tax';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeTaxService {

private baseURL = "http://localhost:8080/income-tax/list";

  constructor(private httpClient: HttpClient) { }

  getIncomeTaxList(): Observable<IncomeTax[]>{
    return this.httpClient.get<IncomeTax[]>(`${this.baseURL}`);
  }

  createIncomeTax(incomeTax: IncomeTax): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, incomeTax);
  }

  getIncomeTaxById(id: number): Observable<IncomeTax>{
    return this.httpClient.get<IncomeTax>(`${this.baseURL}/${id}`);
  }

  updateIncomeTax(id: number, incomeTax: IncomeTax): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, incomeTax);
  }

  deleteIncomeTax(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
  deleteDeduction(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

}
