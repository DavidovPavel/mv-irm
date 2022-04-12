import { Profile, ServiceCompany, ZNUInfo } from '@app/models';

import { MenuItem } from './models/menu-item.interface';
import { Message } from './models/message.inerface';
import { SubMenuItems } from './models/sub-menu-items.interface';

export const commonFeatureKey = 'commonState';

export interface CommonState {
  profile: Profile | null;
  serviceCompany: ServiceCompany | null;
  profileLoaded: boolean;
  isPermissionsLoad: boolean;
  isShowPreloader: boolean;
  message: Message | null;
  leftMenu: MenuItem[] | null;
  leftSubMenuItems: SubMenuItems | null;
  znuInfo: ZNUInfo | null;
}

export const initialState: CommonState = {
  profile: null,
  serviceCompany: null,
  profileLoaded: false,
  leftMenu: null,
  leftSubMenuItems: null,
  message: null,
  isShowPreloader: false,
  isPermissionsLoad: false,
  znuInfo: null,
};
