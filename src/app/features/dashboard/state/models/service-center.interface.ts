export interface ServiceCenter {
  id: number;
  name: string;
  groups: ServiceCenterQuotaGroup[];
}

export interface ServiceCenterQuotaGroup {
  quotaGroupId: number;
  hasQuotas: boolean;
  quotaGroupName: string;
}
