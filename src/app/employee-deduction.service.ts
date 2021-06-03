import { EmployeeDeduction } from './employee-deduction';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDeductionService {


  private baseURL = "http://localhost:8080/employee-deduction/list";

  constructor(private httpClient: HttpClient) { }

  getEmployeeDeductionList(): Observable<EmployeeDeduction[]>{
    return this.httpClient.get<EmployeeDeduction[]>(`${this.baseURL}`);
  }

  createEmployeeDeduction(employeeDeduction: EmployeeDeduction): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, employeeDeduction);
  }

  getEmployeeDeductionById(id: number): Observable<EmployeeDeduction>{
    return this.httpClient.get<EmployeeDeduction>(`${this.baseURL}/${id}`);
  }

  updateEmployeeDeduction(id: number, employeeDeduction: EmployeeDeduction): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, employeeDeduction);
  }

  deleteEmployeeDeduction(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
