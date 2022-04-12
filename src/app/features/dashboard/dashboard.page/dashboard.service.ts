import { Injectable } from '@angular/core';
import { PermissionService } from '@app/core/services/permission.service';
import { IRMPermissions, IRMUserRole } from '@app/models';

import { DashboardTileData } from '../dashboard-tile-data';
import { Tile } from '../state/models/dashboard-tile.interface';

@Injectable()
export class DashboardService {
  roles!: number[];

  source = DashboardTileData;

  constructor(private permissions: PermissionService) {}

  getTiles(roles: number[]): Tile[] {
    this.roles = roles;
    return this.source
      .map((a) => {
        if (this.roles.includes(IRMUserRole.Store) && a.name === 'incidents') {
          return { ...a, component: undefined };
        }
        return a;
      })
      .filter((a) => this.hasPermission(a.permission));
  }

  hasPermission(name: IRMPermissions | undefined): boolean {
    return name ? this.checkExtraConditions4Roles(name) && !!this.permissions.permissions.getPermission(name) : false;
  }

  checkExtraConditions4Roles(name: IRMPermissions): boolean {
    if (this.roles?.includes(IRMUserRole.Store)) {
      return name !== IRMPermissions.DAonAssignment;
    } else {
      return name !== IRMPermissions.DAinStore && name !== IRMPermissions.AvailableQuotas;
    }
  }
}
