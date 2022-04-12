export interface Expiration {
  id: number;
  scores: number;
  highlight: 'yellow' | 'red' | 'white';
}

export interface ExpirationHistoryItem {
  scores: number;
  appointmentDate: string;
  changeDate: string;
  departureDate: string;
  reasonChange: string;
  clientName: string;
  comment: string;
  incidentRequestStatus: string;
}
export interface ExpirationHistory extends Expiration, ExpirationHistoryItem {
  serviceCenterName: string;
  serviceCenterId: number;
}

export interface ExpirationHistoryGroups extends Expiration {
  serviceCenterName: string;
  serviceCenterId: number;
  items: ExpirationHistoryItem[];
}

export interface ScoresUpdateModel {
  id: number;
  serviceCenterId: number;
  incidentRequestId: number;
  scores: number;
  comment: string;
}
