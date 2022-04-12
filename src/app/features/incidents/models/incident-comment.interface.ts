import { IRMUserRole } from '@app/models';

export interface IncidentComment {
  id: number;
  createDate: string;
  userLogin: string;
  userFullName: string;
  text: string;
  roles: IRMUserRole[];
}
