import { Injectable } from '@angular/core';
import { IRMUserRole } from '@app/models';
import { source } from '@app/permissions';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(public permissions: NgxPermissionsService) {}

  loadPermissions(roles: number[] | null): Observable<boolean> {
    if (roles !== null) {
      const collector = new Set<string>();
      roles.forEach((role) => this.getPermissionsByRole(role).forEach((a) => collector.add(a)));
      this.permissions.loadPermissions(Array.from(collector));
      return of(true);
    }
    return of(false);
  }

  private getPermissionsByRole(role: IRMUserRole): string[] {
    return source.get(role) ?? [];
  }
}
