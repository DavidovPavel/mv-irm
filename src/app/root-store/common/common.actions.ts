import { Profile, ServiceCompany, ZNUInfo } from '@app/models';
import { createAction, props } from '@ngrx/store';

import { MenuItem } from './models/menu-item.interface';
import { Message } from './models/message.inerface';
import { SubMenuItems } from './models/sub-menu-items.interface';

export const loadProfile = createAction('[Common] Load Profile');
export const loadProfileSuccess = createAction('[Common] Load Profile Success', props<{ profile: Profile }>());
export const loadProfileFailure = createAction('[Common] Load Profile Failure', props<{ error: string | string[] }>());

export const loadServiceCompany = createAction('[Common] Load ServiceCompany', props<{ serviceCompanyId: number }>());
export const loadServiceCompanySuccess = createAction(
  '[Common] Load ServiceCompany Success',
  props<{ serviceCompany: ServiceCompany }>()
);
export const loadServiceCompanyFailure = createAction(
  '[Common] Load ServiceCompany Failure',
  props<{ error: string | string[] }>()
);

export const loadPermissions = createAction('[Common] Load Permissions', props<{ roles: number[] | null }>());
export const loadPermissionsSuccess = createAction('[Common] Load Permissions Success', props<{ isPermissionsLoad: boolean }>());

export const loadLeftMenu = createAction('[Common] Load Left Menu');
export const loadLeftMenuSuccess = createAction('[Common] Load Left Menu Success', props<{ leftMenu: MenuItem[] }>());

export const showSubMenu = createAction('[Common] Show SubMenu', props<{ leftSubMenuItems: SubMenuItems }>());
export const hideSubMenu = createAction('[Common] Hide SubMenu');

export const newMessage = createAction('[Common] New Message', props<{ message: Message }>());
export const showPreloader = createAction('[Common] Show Preloader', props<{ isShowPreloader: boolean }>());

export const loadZNUInfo = createAction('[Common] Load ZNUInfo', props<{ couponNumber: string }>());
export const loadZNUInfoSuccess = createAction('[Common] Load Success', props<{ znuInfo: ZNUInfo }>());
export const loadZNUInfoFail = createAction('[Common] Load Fail', props<{ error: string | string[] }>());
