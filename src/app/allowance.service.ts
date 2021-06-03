import { Allowance } from './allowance';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllowanceService {

  private baseURL = "http://localhost:8080/allowance/list";

  constructor(private httpClient: HttpClient) { }

  getAllowancesList(): Observable<Allowance[]>{
    return this.httpClient.get<Allowance[]>(`${this.baseURL}`);
  }

  createAllowance(allowance: Allowance): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, allowance);
  }

  getAllowanceById(id: number): Observable<Allowance>{
    return this.httpClient.get<Allowance>(`${this.baseURL}/${id}`);
  }

  updateAllowance(id: number, allowance: Allowance): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, allowance);
  }

  deleteAllowance(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
// start here
 getAllowanceList1(): Observable<any>{
    return this.httpClient.get(`${this.baseURL}`);
  }
}
