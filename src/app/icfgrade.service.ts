import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICFGrade } from './icfgrade';
import { Level } from './level';
import { Salary } from './salary';

@Injectable({
  providedIn: 'root'
})
export class ICFGradeService {
private baseURL="http://localhost:8080/ICFGrade/list";


  constructor(private httpClient: HttpClient) { }

 // For Test
  getICFGradeList(): Observable<ICFGrade[]>{
    return this.httpClient.get<ICFGrade[]>(`${this.baseURL}`);
  }
  createICFGrade(icfGrade: ICFGrade): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, icfGrade);
  }

  getICFGradeById(id: number): Observable<ICFGrade>{
    return this.httpClient.get<ICFGrade>(`${this.baseURL}/${id}`);
  }

  updateICFGrade(id: number, icfGrade: ICFGrade): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, icfGrade);
  }

  deleteICFGrade(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

// to load for DropDown

    getICFGradeList1(): Observable<any>{
    return this.httpClient.get(`${this.baseURL}`);
  }


}
