import { NumberItem } from '@app/models';

export interface ServiceCompany extends NumberItem {
  sapId: string;
}
export interface ServiceCenter extends NumberItem {
  city: NumberItem;
  serviceCompany: ServiceCompany;
}
