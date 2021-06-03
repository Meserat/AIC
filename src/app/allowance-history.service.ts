import { AllowanceHistory } from './allowance-history';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllowanceHistoryService {

 private baseURL = "http://localhost:8080/allowancehistory/list";

  constructor(private httpClient: HttpClient) { }

  getAllowanceHistoryList(): Observable<AllowanceHistory[]>{
    return this.httpClient.get<AllowanceHistory[]>(`${this.baseURL}`);
  }

  createAllowanceHistory(allowanceHistory: AllowanceHistory): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, allowanceHistory);
  }
}
