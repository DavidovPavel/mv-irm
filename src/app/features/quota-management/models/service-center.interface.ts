import { Region } from './region.interface';

export interface ServiceCenter {
  id: number;
  name: string;
  regions: Region[];
}
