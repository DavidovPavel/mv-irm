import { Injectable } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable()
export class PermissionManagementService {
  permissions$ = this.permissionsService.permissions$;

  constructor(private permissionsService: NgxPermissionsService) {}

  has(permission: string | undefined): boolean {
    return !!this.permissionsService.getPermission(permission ?? '');
  }

  add(data: string[] | null): void {
    this.permissionsService.flushPermissions();
    if (data !== null) {
      this.permissionsService.addPermission(data);
    }
  }

  include(data: string[]): void {
    this.permissionsService.addPermission(data);
  }
}
