
import { ServicesProvided } from '@app/models/services-provided';
import { createAction, props } from '@ngrx/store';

export const getServices = createAction('[ServicesProvided] Get Provides', props<{ value: string }>());

export const getServicesSuccess = createAction(
  '[ServicesProvided] Get Provides Success',
  props<{ data: ServicesProvided[] }>()
);

export const getServicesFailure = createAction(
  '[ServicesProvided] Get Provides Failure',
  props<{ error: string | string[] }>()
);
