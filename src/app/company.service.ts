import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from './company';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor( private httpClient: HttpClient) { }
  private baseURL="http://localhost:8080/api/company";
  getCompanyList():Observable<Company[]>{
    return this.httpClient.get<Company[]>(`${this.baseURL}`)
  }


 }
