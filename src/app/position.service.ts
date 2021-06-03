import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from './position';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

 private baseURL="http://localhost:8080/position/list";


  constructor(private httpClient: HttpClient) { }
   getPositionList(): Observable<Position[]>{
    return this.httpClient.get<Position[]>(`${this.baseURL}`);
  }

  createPosition(position: Position): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, position);
  }

  getPositionById(id: number): Observable<Position>{
    return this.httpClient.get<Position>(`${this.baseURL}/${id}`);
  }

  updatePosition(id: number, position: Position): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, position);
  }

  deletePosition(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
  // for DropDown
getPositionList1(): Observable<any>{
    return this.httpClient.get(`${this.baseURL}`);
  }


}
