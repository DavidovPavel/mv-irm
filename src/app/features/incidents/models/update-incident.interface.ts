import { BlameServiceCenterType, IncidentRequestStatusTrigger } from './enums';

export interface UpdateIncident {
  id: number;
  clientName?: string;
  clientPhone?: string;
  incidentCreationReasonId?: number;
  problemEssence?: string;
  expectedSolution?: string;
  responsibleEmployeeMail?: string;
  blameServiceCenterType?: BlameServiceCenterType;
  comments?: string[];
  commentsToDelete?: number[];
  requestFiles: File[];
  commentFiles: File[];
  filesToDelete?: number[];
  IncidentRequestUserEvent?: IncidentRequestStatusTrigger;
  departureDate?: string;
}
