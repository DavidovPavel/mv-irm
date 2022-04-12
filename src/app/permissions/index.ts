import { IRMPermissions, IRMUserRole } from '@app/models';

import { AdminPermissions } from './admin';
import { CallCenterPermissions } from './call-center';
import { CallCenterQuotaReservePermissions } from './call-center-quota-reserve';
import { CentralOfficePermissions } from './central-office';
import { InvestigrationGroupPermissions } from './investigation-group';
import { RecyclingManagerPermissions } from './recycling-manager';
import { RecyclicngRecyclerPermissions } from './recycling-recycler';
import { RecyclingStorePermissions } from './recycling-store';
import { ReserveQuotasPermissions } from './reserve-quotas';
import { SeniorManagerPermissions } from './senior-mamager';
import { ServiceCompanyPermissions } from './service-company';
import { StorePermissions } from './store';
import { SupportPermissions } from './support';

export const source = new Map<IRMUserRole, IRMPermissions[]>([
  [IRMUserRole.Administrator, AdminPermissions],
  [IRMUserRole.CallCenter, CallCenterPermissions],
  [IRMUserRole.ServiceCompany, ServiceCompanyPermissions],
  [IRMUserRole.Store, StorePermissions],
  [IRMUserRole.CentralOffice, CentralOfficePermissions],
  [IRMUserRole.SeniorManager, SeniorManagerPermissions],
  [IRMUserRole.Support, SupportPermissions],
  [IRMUserRole.CallCenterWithQuotaReserve, CallCenterQuotaReservePermissions],
  [IRMUserRole.InvestigationGroup, InvestigrationGroupPermissions],
  [IRMUserRole.ServiceCompanyWithQuotaReserve, ReserveQuotasPermissions],
  [IRMUserRole.Recyclicng_Recycler, RecyclicngRecyclerPermissions],
  [IRMUserRole.Recyclicng_Store, RecyclingStorePermissions],
  [IRMUserRole.Recycling_Manager, RecyclingManagerPermissions],
  [IRMUserRole.InvestigationGroup, [IRMPermissions.RegisterRequests]],
  [
    IRMUserRole.Recycling_CallCenter,
    [IRMPermissions.Recycling, IRMPermissions.RecyclingMain, IRMPermissions.RecyclingService],
  ],
]);
