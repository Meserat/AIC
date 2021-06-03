import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PayrollHistory } from './payroll-history';

@Injectable({
  providedIn: 'root'
})
export class PayrollHistoryService {

  private baseURL = "http://localhost:8080/payrollHistory/list";

  constructor(private httpClient: HttpClient) { }

  getPayrollHistoryList(): Observable<PayrollHistory[]>{
    return this.httpClient.get<PayrollHistory[]>(`${this.baseURL}`);
  }

  createPayrollList(payrollHistory: PayrollHistory): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, payrollHistory);
  }

}
