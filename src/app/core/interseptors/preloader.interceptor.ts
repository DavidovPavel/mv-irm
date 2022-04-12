import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonStateActions } from '@app/root-store/common';
import { RootState } from '@app/root-store/root-state';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class PreloaderInterceptor implements HttpInterceptor {
  counter = 0;
  constructor(private store: Store<RootState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.show();
    return next.handle(request).pipe(
      catchError((err) => {
        this.hide();
        return throwError(err);
      }),
      finalize(() => this.hide())
    );
  }

  show(): void {
    if (this.counter <= 0) {
      this.counter = 0;
      this.store.dispatch(CommonStateActions.showPreloader({ isShowPreloader: true }));
    }
    this.counter++;
  }

  hide(): void {
    this.counter--;
    if (this.counter === 0) {
      this.store.dispatch(CommonStateActions.showPreloader({ isShowPreloader: false }));
    }
  }
}
