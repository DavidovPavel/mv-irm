import { createReducer, on } from '@ngrx/store';

import * as actions from './actions';
import { initialState } from './state';

export const reducer = createReducer(
  initialState,
  on(actions.getServicesSuccess, (state, { data }) => ({ ...state, services: data, isLoading: true })),
  on(actions.getServicesFailure, (state, { error }) => ({ ...state, error, isLoading: false }))
);
