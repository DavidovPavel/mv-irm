import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromDashboard from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<fromDashboard.State>(fromDashboard.storeKey);

export const selectIncidentsStatus = createSelector(selectDashboardState, (state) => state.incidentsStatus);
export const selectInstallationStats = createSelector(selectDashboardState, (state) => state.installationStats);
export const selectAssistantStats = createSelector(selectDashboardState, (state) => state.assistantStats);

export const selectMetrics = createSelector(selectDashboardState, (state) => state.metrics);
export const selectMarks = createSelector(selectDashboardState, (state) => state.marks);
export const selectCatalog = createSelector(selectDashboardState, (state) => state.catalog);

export const selectMasterAppealsClosedState = createSelector(
  selectDashboardState,
  (state) => state.masterAppealsClosedState
);
