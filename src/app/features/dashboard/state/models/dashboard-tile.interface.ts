import { Type } from '@angular/core';
import { IRMPermissions } from '@app/models';

export interface Tile {
  name: string;
  url: string;
  title: string;
  description?: { text: string; permission?: IRMPermissions } | string;
  component?: Type<any>;
  inside?: true;
  permission?: IRMPermissions;
}
