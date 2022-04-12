import { IRMPermissions } from '@app/models';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/ru';
import { ErrorHandler, NgModule } from '@angular/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MatMomentDateModule,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '@env/environment';
import { ENVIRONMENT_TOKEN, IRM_DATETIME_FORMAT, IrmCommonModule } from '@irm-ui/common';
import { ApplicationinsightsAngularpluginErrorService } from '@microsoft/applicationinsights-angularplugin-js';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { NgxPermissionsModule } from 'ngx-permissions';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetRussianPaginatorIntl } from './core/i18n/mat-paginator';
import { httpInterseptorProviders } from './core/interseptors';
import { RootStoreModule } from './root-store/root-store.module';
import { PreloaderComponent } from './shell/preloader/preloader.component';
import { SadebarModule } from './shell/sidebar/sidebar.module';

registerLocaleData(locale, 'ru');

const mapConfig: YaConfig = {
  apikey: environment.ymapApiKey,
};

@NgModule({
  declarations: [AppComponent, PreloaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IrmCommonModule,
    SadebarModule,
    AppRoutingModule,
    RootStoreModule,
    MatMomentDateModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatProgressBarModule,
    NgxPermissionsModule.forRoot(),
    AngularYandexMapsModule.forRoot(mapConfig),
  ],
  bootstrap: [AppComponent],
  providers: [
    httpInterseptorProviders,
    {
      provide: IRMPermissions,
      useValue: IRMPermissions,
    },
    { provide: MatPaginatorIntl, useValue: GetRussianPaginatorIntl() },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: IRM_DATETIME_FORMAT },
    {
      provide: ENVIRONMENT_TOKEN,
      useValue: environment,
    },
    {
      provide: ErrorHandler,
      useFactory: () => {
        return environment.production ? ApplicationinsightsAngularpluginErrorService : new ErrorHandler();
      },
    },
  ],
})
export class AppModule {}
