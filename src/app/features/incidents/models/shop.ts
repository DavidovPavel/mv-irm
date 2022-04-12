import { NumberItem } from '@app/models';
import { Brand } from './enums';

export interface Shop extends NumberItem {
  brand: Brand;
}
