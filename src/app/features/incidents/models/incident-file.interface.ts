import { IRMUserRole } from '@app/models';
export interface FileInfo {
  id: number;
  name: string;
  size: number;
  created: string;
}

export interface IncidentFile {
  id: number;
  file: FileInfo;
  roles: IRMUserRole[];
  userFullName: string;
  userLogin: string;
}
