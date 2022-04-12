import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { NoCacheInterceptor } from './no-cache.interceptor';
import { PreloaderInterceptor } from './preloader.interceptor';

export const httpInterseptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: PreloaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: NoCacheInterceptor,
    multi: true,
  },
];
