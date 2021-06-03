import { TokenStorageService } from './token-storage.service';
import { AuthService } from './auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(public auth:TokenStorageService){}
  intercept(httpRequest:HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
    httpRequest=httpRequest.clone({setHeaders:{
    Authentication:`Bearer ${this.auth.getToken()}` }});
    return next.handle(httpRequest);
  }
}
