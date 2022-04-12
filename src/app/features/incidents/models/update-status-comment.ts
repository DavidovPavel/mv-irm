import { IncidentRequestStatusTrigger } from './enums';

export interface UpdateStatusOrComment {
  id: number;
  IncidentRequestUserEvent?: IncidentRequestStatusTrigger;
  comments?: string[];
}
