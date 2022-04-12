import { IRMPermissions } from '@app/models';

export interface MenuItem {
  name: string;
  url: string | any[];
  outside?: true;
  icon?: string;
  children?: MenuItem[];
  permission?: IRMPermissions;
}
