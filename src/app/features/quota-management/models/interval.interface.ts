import { Limit } from './limit.interface';

export interface Interval {
  intervalId: number;
  value: string;
  limits: Limit[];
}
