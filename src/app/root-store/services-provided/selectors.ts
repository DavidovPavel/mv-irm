import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, storeKey } from './state';

export const selectServicesState = createFeatureSelector<State>(storeKey);

export const selectServices = createSelector(selectServicesState, (state) => state.services);
