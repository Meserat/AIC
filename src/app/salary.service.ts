import { Salary } from './salary';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

    private baseURL = "http://localhost:8080/salary/list";

  constructor(private httpClient: HttpClient) { }

  getSalaryList(): Observable<Salary[]>{
    return this.httpClient.get<Salary[]>(`${this.baseURL}`);
  }

  createSalary(salary: Salary): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, salary);
  }

  getsalaryById(id: number): Observable<Salary>{
    return this.httpClient.get<Salary>(`${this.baseURL}/${id}`);
  }

  updateSalary(id: number, salary: Salary): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, salary);
  }

  deleteSalary(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  //  getSalary(id: number): Observable<Salary>{
  //   return this.httpClient.get<Salary>(`${this.baseURL}/${id}`);
  // }
  getSalaryList1(): Observable<any>{
    return this.httpClient.get(`${this.baseURL}`);
  }


}
