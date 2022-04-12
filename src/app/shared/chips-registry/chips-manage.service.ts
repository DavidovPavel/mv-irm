import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Chip } from './models';

@Injectable()
export class ChipsManageService {
  items = new Map<string, Chip>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  addChip(key: string, chip: Chip): void {
    this.items.set(key, chip);
    this.refreshRouter();
  }

  removeChip(key: string): void {
    this.items.delete(key);
    this.refreshRouter();
  }

  clearChips(): void {
    this.items.clear();
    this.refreshRouter();
  }

  refreshRouter(): void {
    this.router.navigate(['./', this.toParams()]);
  }

  toParams(): { [key: string]: string } {
    return Array.from(this.items.entries()).reduce((p, [key, o]) => ({ ...p, [key]: o.value }), {});
  }
}
