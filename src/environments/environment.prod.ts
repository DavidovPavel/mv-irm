
const protocol = location.protocol;

export const environment = {
  production: true,
  linkUrl: protocol + '//#{{LINKURL}}#IRM#/',
  linkUrlAlt: protocol + '//#{{LINKURL}}#',
  appInsights: {
    instrumentationKey: '#{{APPINS_KEY}}#',
    connectionString:
      'InstrumentationKey=#{{APPINS_KEY}}#;IngestionEndpoint=#{{APPINS_ENDPOINT}}#',
    trace: true,
  },
  ymapApiKey: '#{{YAMAP_API_KEY}}#'
};
