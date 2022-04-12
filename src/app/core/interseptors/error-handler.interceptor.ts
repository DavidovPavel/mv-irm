import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonStateActions } from '@app/root-store/common';
import { Errors } from '@app/root-store/common/models/error.interface';
import { Message } from '@app/root-store/common/models/message.inerface';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { MonitoringService } from '../services/monitoring.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store, private monitoringService: MonitoringService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => this.monitoringService.logTrace(request, event)),
      catchError((e: HttpErrorResponse) => {
        this.monitoringService.logException(e);
        if (e.status === 500) {
          this.store.dispatch(
            CommonStateActions.newMessage({
              message: {
                type: 'error',
                text: `Произошла критическая ошибка. Повторите попытку или свяжитесь с администратором.`,
              },
            })
          );
          return throwError(e);
        }

        if (e.status === 400) {
          const errorMessage = e.error?.errors as Errors;
          if (errorMessage) {
            const message: Message = {
              type: 'error',
              text: errorMessage.validations.join(','),
            };
            if (message.text) {
              this.store.dispatch(CommonStateActions.newMessage({ message }));
            }
          }
        }
        return throwError(e);
      })
    );
  }
}
