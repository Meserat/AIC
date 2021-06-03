import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeductionHistory } from './deduction-history';

@Injectable({
  providedIn: 'root'
})
export class DeductionHistoryService {

 private baseURL = "http://localhost:8080/deductionHistory/list";

  constructor(private httpClient: HttpClient) { }

  getDeductionHistoryList(): Observable<DeductionHistory[]>{
    return this.httpClient.get<DeductionHistory[]>(`${this.baseURL}`);
  }

  createDeductionHistory(deductionHistory: DeductionHistory): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, deductionHistory);
  }
}
