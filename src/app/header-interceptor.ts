import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor{
  intercept(httpRequest:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
    const API_KEY = 'Authorization';

return next.handle(httpRequest.clone({setHeaders:{API_KEY}})) ;
}
}
