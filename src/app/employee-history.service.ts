import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeHistory } from './employee-history';

@Injectable({
  providedIn: 'root'
})
export class EmployeeHistoryService {

 private baseURL = "http://localhost:8080/employeeHistory/list";

  constructor(private httpClient: HttpClient) { }

  getEmployeeHistoryList(): Observable<EmployeeHistory[]>{
    return this.httpClient.get<EmployeeHistory[]>(`${this.baseURL}`);
  }

  createEmployeeHistory(employeeHistory: EmployeeHistory): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, employeeHistory);
  }
}
