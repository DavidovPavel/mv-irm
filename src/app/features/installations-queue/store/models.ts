import { NumberItem } from '@app/models';

export interface ServiceCenter extends NumberItem {
  hasQuotas: boolean;
  groups: ServiceCenterQuotaGroup[];
}

export interface QuotaGroupInfo extends NumberItem {
  totalWithoutQuotas?: number;
  regions?: Region[];
}

export interface ServiceCenterQuotaGroup {
  quotaGroupId: number;
  hasQuotas: boolean;
  averageValue: number;
  quotaGroupName: string;
  regions: Region[];
  periodDateFrom: string;
  periodDateTo: string;
  periodFrom: number;
  periodTo: number;
  isExpanded?: boolean;
}

export interface Region {
  expand?: boolean;
  id: number;
  hasQuotas: boolean;
  name: string;
  limits: Limit[];
  intervals?: Interval[];
  intervalLimits?: RegionLimits[];
}

export interface Interval {
  intervalId: number;
  intervalValue: string;
}
export interface Limit {
  limit: number;
  reserve: number;
  date: string;
  hasQuotas: boolean;
  inPeriod: boolean;
  intervals: Interval[];
}

export interface RegionLimits {
  date: string;
  limits: Limit[];
}

export interface RegionLimitsData extends LimitParams {
  intervals: Interval[];
  regionLimits: RegionLimits[];
}

export interface ReportSettings {
  id: number;
  numberOfDaysWithDateTo: number;
  numberOfDaysWithDateFrom: number;
  serviceIds: number[];
}

export interface LimitParams {
  serviceCenterId: number;
  quotaGroupId: number;
  regionId: number;
}

export interface LimitsByDayParams extends LimitParams {
  day: string;
}
