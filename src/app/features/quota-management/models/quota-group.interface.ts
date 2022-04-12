import { Interval } from './interval.interface';

export interface QuotaGroup {
  id: number;
  name: string;
  intervals: Interval[];
}
