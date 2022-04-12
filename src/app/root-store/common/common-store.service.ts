import { Injectable } from '@angular/core';
import { MenuItems } from '@app/core/data/left-menu-data';

import { PermissionService } from '@app/core/services/permission.service';
import { Profile, ServiceCompany, ZNUInfo } from '@app/models';
import { ApiService } from '@irm-ui/common';
import { Observable, of } from 'rxjs';

import { MenuItem } from './models/menu-item.interface';

@Injectable()
export class CommonStoreService {
  constructor(private api: ApiService, private service: PermissionService) {}

  getProfile(): Observable<Profile> {
    return this.api.get<Profile>('Main/api/Profiles');
  }

  getServiceCompany(id: number): Observable<ServiceCompany> {
    return this.api.get<ServiceCompany>(`Main/api/ServiceCompanies/${id}`);
  }

  loadPermissions(roles: number[] | null): Observable<boolean> {
    return this.service.loadPermissions(roles);
  }

  getLeftMenu(): Observable<MenuItem[]> {
    return of(MenuItems);
  }

  loadZNUInfo(couponNumber: string): Observable<ZNUInfo> {
    return this.api.get(`Main/api/BaseServices/couponNumbers/${couponNumber}/type`);
  }
}
