export interface IncidentsStatus {
  numberNewRequests: number;
  numberInProgressRequests: number;
  willExpireRequests?: number;
  expiredRequests?: number;
}
