import { Section } from './section';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

private baseURL="http://localhost:8080/section/list";


  constructor(private httpClient: HttpClient) { }

 // For Test
  getSectionList(): Observable<Section[]>{
    return this.httpClient.get<Section[]>(`${this.baseURL}`);
  }
  createSection(section: Section): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, section);
  }

  getSectionById(id: number): Observable<Section>{
    return this.httpClient.get<Section>(`${this.baseURL}/${id}`);
  }

  updateSection(id: number, section: Section): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, section);
  }

  deleteSection(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

// to load for DropDown

    getSectionList1(): Observable<any>{
    return this.httpClient.get(`${this.baseURL}`);
  }


}
