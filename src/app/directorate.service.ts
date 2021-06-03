import { Directorate } from './directorate';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectorateService {

private baseURL = "http://localhost:8080/directorate/list";

  constructor(private httpClient: HttpClient) { }

  getDirectoratesList(): Observable<Directorate[]>{
    return this.httpClient.get<Directorate[]>(`${this.baseURL}`);
  }

  createDirectorate(directorate: Directorate): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, directorate);
  }

  getDirectorateById(id: number): Observable<Directorate>{
    return this.httpClient.get<Directorate>(`${this.baseURL}/${id}`);
  }

  updateDirectorate(id: number, directorate: Directorate): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, directorate);
  }

  deleteDirectorate(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
