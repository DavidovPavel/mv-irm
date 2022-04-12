import { createReducer, on } from '@ngrx/store';

import {
  hideSubMenu,
  loadLeftMenuSuccess,
  loadPermissionsSuccess,
  loadProfileFailure,
  loadProfileSuccess,
  loadServiceCompanyFailure,
  loadServiceCompanySuccess,
  loadZNUInfoFail,
  loadZNUInfoSuccess,
  newMessage,
  showPreloader,
  showSubMenu,
} from './common.actions';
import { initialState } from './common.state';

export const reducer = createReducer(
  initialState,
  on(loadProfileFailure, (state, { error }) => ({ ...state, error })),
  on(loadProfileSuccess, (state, { profile }) => ({ ...state, profile, profileLoaded: true })),

  on(loadServiceCompanyFailure, (state, { error }) => ({ ...state, error })),
  on(loadServiceCompanySuccess, (state, { serviceCompany }) => ({ ...state, serviceCompany })),

  on(loadPermissionsSuccess, (state, { isPermissionsLoad }) => ({ ...state, isPermissionsLoad })),

  on(loadLeftMenuSuccess, (state, { leftMenu }) => ({ ...state, leftMenu })),

  on(showSubMenu, (state, { leftSubMenuItems }) => ({ ...state, leftSubMenuItems })),
  on(hideSubMenu, (state) => ({ ...state, leftSubMenuItems: { items: null } })),

  on(newMessage, (state, { message }) => ({ ...state, message })),
  on(showPreloader, (state, { isShowPreloader }) => ({ ...state, isShowPreloader })),

  on(loadZNUInfoSuccess, (state, { znuInfo }) => ({ ...state, znuInfo })),
  on(loadZNUInfoFail, (state, { error }) => ({ ...state, znuInfo: null }))
);
