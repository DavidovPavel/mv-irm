import { NumberItem } from '@app/models';

export interface Profile extends NumberItem {
  login: string;
  email: string | null;
  cellPhone: string | null;
  serviceCompanyId: number | null;
  groupSid: string | null;
  isGroup: boolean;
  shopNumber: string | null;
  roles: number[] | null;
}
