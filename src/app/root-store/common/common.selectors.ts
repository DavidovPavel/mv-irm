import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCommon from './common.state';

export const selectCommonState = createFeatureSelector<fromCommon.CommonState>(fromCommon.commonFeatureKey);

export const selectProfileLoaded = createSelector(selectCommonState, (state) => state.profileLoaded);
export const selectProfile = createSelector(selectCommonState, (state) => state.profile);
export const selectServiceCompanyId = createSelector(selectCommonState, (state) => state.profile?.serviceCompanyId);

export const selectServiceCompany = createSelector(selectCommonState, (state) => state.serviceCompany);
export const selectServiceCompanySapId = createSelector(selectCommonState, (state) => state.serviceCompany?.sapId);

export const selectLeftMenu = createSelector(selectCommonState, (state) => state.leftMenu);
export const selectIsPermissionsLoad = createSelector(selectCommonState, (state) => state.isPermissionsLoad);

export const selectMessage = createSelector(selectCommonState, (state) => state.message);
export const selectIsShowPreloader = createSelector(selectCommonState, (state) => state.isShowPreloader);
export const selectSubMenuItems = createSelector(selectCommonState, (state) => state.leftSubMenuItems);
export const selectZNUInfo = createSelector(selectCommonState, (state) => state.znuInfo);
