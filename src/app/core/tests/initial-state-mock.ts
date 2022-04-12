import { MockStoreConfig } from '@ngrx/store/testing';

export const initialStateMock: MockStoreConfig<any> = {
  initialState: {
    profile: { profile: {} },
    pageState: { title: '' },
    'equipment-installation': { instance: {}, files: [], servicesProvided: [] },
  },
};
