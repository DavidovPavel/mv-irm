import { OperationType } from './enums';
import { EquipmentInstallation } from './equipment-installation.interface';
import { InstallationFilters } from './installation-registry.store';

export interface FileInfo {
  id: number;
  appealId: number;
  name: string | null;
  data: string | null;
  size: number;
}

export interface AppealAdditionalInfo {
  id: number;
  appealId: number;
  key: string | null;
  stringValue: string | null;
  intValue: number | null;
  decimalValue: number | null;
  dateTimeValue: string | null;
  boolValue: boolean | null;
  created: string | null;
  createdBy: string | null;
  changed: string | null;
  changedBy: string | null;
}

export interface Resolver {
  id: number;
  name: string | null;
  externalId: string | null;
  phone: string | null;
  email: string | null;
  appeals: EquipmentInstallation[];
}

export interface Operation {
  op: OperationType;
  path?: string;
  value?: string;
  from?: string;
}

export interface SearchModel extends InstallationFilters {
  id: string;
  filter: string;
  status: number;
  pageIndex: number;
  pageSize: number;
}

export type SearchParams = Partial<SearchModel>;
