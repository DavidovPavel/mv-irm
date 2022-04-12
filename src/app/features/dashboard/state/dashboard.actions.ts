import { createAction, props } from '@ngrx/store';

import { CatalogParamsRequest } from './models/catalog-params-request';
import { CatalogResponse } from './models/catalog-response.interface';
import { IncidentsStatus } from './models/incidents-status.interface';
import { MarkParamsRequest } from './models/mark-params-request.interface';
import { MarkResponse } from './models/mark-response.interface';
import { MetricsParamsRequest } from './models/metrics-params-request.interface';
import { MetricResponse } from './models/metrics-response.interface';
import { StatsModel } from './models/stats-model.interface';

export const loadIncidentsStatus = createAction('[Dashboard] Load Status Incidents');
export const loadIncidentsStatusSuccess = createAction(
  '[Dashboard] Load Status Incidents Success',
  props<{ incidentsStatus: IncidentsStatus }>()
);

export const loadInstallationStatus = createAction('[Dashboard] Load Stats Equipment Installation');
export const loadInstallationStatusSuccess = createAction(
  '[Dashboard] Load Stats Equipment Installation Success',
  props<{ installationStats: StatsModel }>()
);

export const loadAssistantStatus = createAction('[Dashboard] Load Assistant Status');
export const loadAssistantStatusSuccess = createAction(
  '[Dashboard]  Load Assistant Status Success',
  props<{ assistantStats: StatsModel }>()
);

export const loadMetrics = createAction('[Dashboard] Load Metrics', props<{ params: Partial<MetricsParamsRequest> }>());
export const loadMetricsSuccess = createAction(
  '[Dashboard] Load Metrics Success',
  props<{ metrics: MetricResponse[] }>()
);
export const loadMetricsFailure = createAction('[Dashboard] Load Metrics Failure', props<{ error: any }>());

export const loadMarks = createAction('[Dashboard] Load Marks', props<{ params: Partial<MarkParamsRequest> }>());
export const loadMarksSuccess = createAction('[Dashboard] Load Marks Success', props<{ marks: MarkResponse[] }>());
export const loadMarksFailure = createAction('[Dashboard] Load Marks Failure', props<{ error: any }>());

export const loadCatalog = createAction('[Dashboard] Load Catalog', props<{ params: Partial<CatalogParamsRequest> }>());
export const loadCatalogSuccess = createAction(
  '[Dashboard] Load Catalog Success',
  props<{ catalog: CatalogResponse }>()
);
export const loadCatalogFailure = createAction('[Dashboard] Load Catalog Failure', props<{ error: any }>());

export const loadMasterAppealsClosedState = createAction('[Dashboard] Get Master Appeals Closed State');
export const loadMasterAppealsClosedStateSuccess = createAction(
  '[Dashboard] Get Master Appeals Closed State Success',
  props<{ masterAppealsClosedState: string }>()
);
