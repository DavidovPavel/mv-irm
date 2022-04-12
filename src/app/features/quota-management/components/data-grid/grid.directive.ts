import { Directive, Input } from '@angular/core';

import { Interval, Limit, QuotaGroup, QuotaModel } from '../../models';

export interface Item {
  [id: string]: number;
}

@Directive({
  selector: '[appGrid]',
  exportAs: 'gridSource',
})
export class GridDirective {
  quotas: QuotaGroup[] = [];
  dataset: Item[] = [];
  intervals: { groupId: number; intervalId: number | null }[] = [];
  days: string[] = [];

  changes: QuotaModel[] = [];

  @Input('appGrid') set groups(data: QuotaGroup[]) {
    if (data) {
      this.intervals = [];
      this.days = [];
      this.quotas = data;
      this.dataset = data.reduce<Item[]>((p, c) => [...p, ...this.addDataToRow(c.intervals, c.id)], []);
    }
  }

  addDataToRow(intervals: Interval[], groupId: number): Item[] {
    if (intervals?.length) {
      return intervals.reduce<Item[]>((p, c) => {
        this.intervals.push({ groupId, intervalId: c.intervalId });
        return [...p, this.addDataToCol(c.limits)];
      }, []);
    } else {
      this.intervals.push({ groupId, intervalId: null });
      return [{}];
    }
  }

  addDataToCol(limits: Limit[]): Item {
    limits = limits.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    if (this.days.length === 0) {
      this.days = limits.map((a) => a.date);
    }
    return limits.reduce((p, c, i) => ({ ...p, [`limit_${i}`]: c.limit, [`reserve_${i}`]: c.reserve }), {});
  }
}
