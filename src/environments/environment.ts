// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  linkUrl: 'http://tst-irm01:8060/IRM#/',
  linkUrlAlt: 'http://tst-irm01:8060/',
  ymapApiKey: '16314935-7c7d-4d05-8e60-54b0476baf9a',
  appInsights: {
    instrumentationKey: 'c6ab0532-072b-4a25-9509-0f03d10ded5f',
    connectionString:
      'InstrumentationKey=c6ab0532-072b-4a25-9509-0f03d10ded5f;IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com/',
    trace: true,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
