import { QuotaModel } from './quota-model.interface';

export interface Limit extends QuotaModel {
  reserve: number;
}
