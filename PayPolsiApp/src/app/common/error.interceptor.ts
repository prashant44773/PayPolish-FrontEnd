import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MessageService } from '../services/message.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private notify : MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(tap({
      next:(event) =>{

        return event;
      },
      error:(error)=>{
        if(error.status === 0){
          this.notify.showErrorMsg("There was Some Problem Connecting with the Server")
        }

        if(error.status === 400){
          this.notify.showErrorMsg("Some Error Occurs While Processing Request !")
        }

        this.notify.showErrorMsg("Some Error Occurs While Connecting with the Server !");
      }
    }));
  }
}
