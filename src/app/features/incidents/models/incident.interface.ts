import { NumberItem } from '@app/models';

import { IncidentComment, IncidentFile } from '.';
import { BlameServiceCenterType, IncidentRequestStatusType, SaleChannel } from './enums';
import { Expiration } from './expiration.interface';
import { Shop } from './shop';

export interface Incident {
  id: number;
  numberZNU: string;
  incidentNumber: string;
  clientName: string;
  clientPhone: string;
  incidentCreationReason: NumberItem;
  incidentCreationReasonId: number;
  problemEssence: string;
  expectedSolution: string;
  responsibleEmployeeMail: string;
  serviceCenterId: number;
  serviceCenterName: string;
  serviceCompanyId: number;
  serviceCompanyName: string;
  incidentRequestStatusType: IncidentRequestStatusType;
  blameServiceCenterType: BlameServiceCenterType;
  departureDate: string;
  creationDate: string;
  reopenDate: string;
  actualReactionDate: string;
  closeDate: string;
  serviceName: string;
  internetOrderNumber: string;
  tsOrderNumber: string;
  shop: Shop;
  city: NumberItem;
  saleChannel: SaleChannel;
  requestFiles: IncidentFile[];
  commentFiles: IncidentFile[];
  comments: IncidentComment[];
  appointmentDate: string;
  expiration: Expiration | null;
}
