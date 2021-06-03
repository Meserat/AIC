import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Role } from './role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
 private baseURL = "http://localhost:8080/roles/list";
  constructor(private httpClient: HttpClient) { }

  getRoleList(): Observable<Role[]>{
    return this.httpClient.get<Role[]>(`${this.baseURL}`);
  }
  getRoleById(id: number): Observable<Role>{
    return this.httpClient.get<Role>(`${this.baseURL}/${id}`);

}
}
