import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class NoCacheInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Internet Explorer 6-11
    const isIE = /*@cc_on!@*/ false || !!(document as any).documentMode;

    if (request.method === 'GET' && isIE) {
      const noCacheRequest = request.clone({
        headers: request.headers.set('Cache-Control', 'no-cache').set('Pragma', 'no-cache'),
      });
      return next.handle(noCacheRequest);
    }

    return next.handle(request);
  }
}
