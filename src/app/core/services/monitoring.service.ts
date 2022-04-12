import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { AngularPlugin } from '@microsoft/applicationinsights-angularplugin-js';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

@Injectable({
  providedIn: 'root',
})
export class MonitoringService {
  appInsights: ApplicationInsights;

  constructor(private router: Router) {
    const angularPlugin = new AngularPlugin();
    this.appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: environment.appInsights.instrumentationKey,
        enableAutoRouteTracking: true,
        connectionString: environment.appInsights.connectionString,
        extensions: [angularPlugin],
        extensionConfig: {
          [angularPlugin.identifier]: { router: this.router },
        },
      },
    });
    this.appInsights.loadAppInsights();
  }

  logPageView(name?: string, uri?: string): void {
    this.appInsights.trackPageView({
      name,
      uri,
    });
  }

  logEvent(name: string, properties?: { [key: string]: any }): void {
    this.appInsights.trackEvent({ name }, properties);
  }

  logMetric(name: string, average: number, properties?: { [key: string]: any }): void {
    this.appInsights.trackMetric({ name, average }, properties);
  }

  logException(exception: Error, severityLevel?: number): void {
    this.appInsights.trackException({ exception, severityLevel });
  }

  logTrace(request: HttpRequest<unknown>, response: HttpEvent<any>): void {
    if (environment.appInsights.trace) {
      const { url: message } = request;
      this.appInsights.trackTrace({ message }, { request, response });
    }
  }
}
