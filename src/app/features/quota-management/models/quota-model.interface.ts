export interface QuotaModel {
  date: string;
  groupId: number;
  intervalId: number | null;
  limit: number;
}

export interface UpdateQuotasModel {
  serviceCenterId: number;
  regionId: number;
  quotas: QuotaModel[];
}
