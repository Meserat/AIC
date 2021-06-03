import { Router } from '@angular/router';
import { EmployeeAllowance } from './employee-allowance';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAllowanceService {

  private baseURL = "http://localhost:8080/employee-allowance/list";

  constructor(private httpClient: HttpClient, private router:Router) { }

  getEmployeeAllowanceList(): Observable<EmployeeAllowance[]>{
    return this.httpClient.get<EmployeeAllowance[]>(`${this.baseURL}`);
  }

  createEmployeeAllowance(employeeAllowance: EmployeeAllowance): Observable<Object>{

    return this.httpClient.post(`${this.baseURL}`, employeeAllowance);


 }


  getEmployeeAllowanceById(id: number): Observable<EmployeeAllowance>{
    return this.httpClient.get<EmployeeAllowance>(`${this.baseURL}/${id}`);
  }

  updateEmployeeAllowance(id: number, employeeAllowance: EmployeeAllowance): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, employeeAllowance);
  }

  deleteEmployee(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

}
