import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class tokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      request = request.clone({
        setHeaders: {
          Authorization: `${this.userService.userToken}`,
        },
      });
   
    return next.handle(request);
  }
}