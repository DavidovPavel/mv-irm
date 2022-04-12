import { MenuItem } from './menu-item.interface';

export interface SubMenuItems {
  items: MenuItem[] | null;
  position?: { left: number; top: number };
}
