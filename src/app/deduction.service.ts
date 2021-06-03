import { Deduction } from './deduction';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeductionService {

  private baseURL = "http://localhost:8080/deduction/list";

    constructor(private httpClient: HttpClient) { }

  getDeductionsList(): Observable<Deduction[]>{
    return this.httpClient.get<Deduction[]>(`${this.baseURL}`);
  }

  createDeduction(deduction: Deduction): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, deduction);
  }

  getDeductionById(id: number): Observable<Deduction>{
    return this.httpClient.get<Deduction>(`${this.baseURL}/${id}`);
  }

  updateDeduction(id: number, deduction: Deduction): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, deduction);
  }

  deleteDeduction(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
  // getDeductionList1(): Observable<any>{
  //   return this.httpClient.get(`${this.baseURL}`);
  // }

}

