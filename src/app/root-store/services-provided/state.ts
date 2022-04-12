import { ServicesProvided } from '@app/models/services-provided';

export const storeKey = 'servicesProvided';
export interface State {
  services: ServicesProvided[] | null;
  isLoading: boolean;
  error?: string | string[] | null;
}

export const initialState: State = {
  services: null,
  isLoading: false,
  error: null,
};
