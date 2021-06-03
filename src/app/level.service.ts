import { Level } from './level';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private baseURL="http://localhost:8080/level/list";

  constructor(private httpClient: HttpClient) { }
   getLevelList(): Observable<Level[]>{
    return this.httpClient.get<Level[]>(`${this.baseURL}`);
  }

  createLevel(level: Level): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, level);
  }

  getLevelById(id: number): Observable<Level>{
    return this.httpClient.get<Level>(`${this.baseURL}/${id}`);
  }

  updateLevel(id: number, level: Level): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, level);
  }

  deleteLevel(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }


 getLevelList1(): Observable<any>{
    return this.httpClient.get(`${this.baseURL}`);
  }


}
