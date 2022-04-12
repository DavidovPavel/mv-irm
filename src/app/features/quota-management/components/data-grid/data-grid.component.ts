import { Component, ChangeDetectorRef } from '@angular/core';
import Handsontable from 'handsontable';
import * as moment from 'moment';

import { GridDirective } from './grid.directive';

const WEEK_DAYS = 7;
const COL_WIDTH = 78;
const ROW_HEIGHT = 25;

const exp = new RegExp(/(?<![-.])\b[0-9]{1,4}\b(?!\.[0-9])/);
@Component({
  selector: 'app-quota-management-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent {
  hotSettings: Handsontable.GridSettings = {
    colHeaders: new Array(WEEK_DAYS).fill(null).reduce<string[]>((p) => [...p, ...['лимит', 'выбрано']], []),
    rowHeights: ROW_HEIGHT,
    colWidths: COL_WIDTH,
    rowHeaderWidth: COL_WIDTH,
    stretchH: 'all',
    width: '100%',
    height: 'auto',
    licenseKey: 'non-commercial-and-evaluation',
    cells: this.cellsProp.bind(this),
    afterChange: this.detectChanges.bind(this),
  };

  constructor(public readonly source: GridDirective, public cdRef: ChangeDetectorRef) {}

  cellsProp(row: number, column: number, prop: string | number): Handsontable.CellMeta {
    const previousDates = (): boolean => {
      if (prop.toString().startsWith('reserve')) {
        return true;
      } else {
        const [, i] = prop.toString().split('_');
        const yesterday = moment().subtract(1, 'day');
        const date = this.source.days[+i];
        const checkDate = moment(date);
        return checkDate.isBefore(yesterday);
      }
    };

    return {
      type: 'numeric',
      readOnly: previousDates(),
    };
  }

  detectChanges(changes: [number, string | number, number, number][] | null, source: string): void {
    if (source !== 'loadData' && changes) {
      changes.forEach((a) => {
        const [row, col, old, limit] = a;

        if (!exp.test(limit.toString())) {
          const dataset = this.source.dataset;
          dataset[row][col] = old;
          this.source.dataset = [...dataset];
          this.cdRef.markForCheck();
        }

        if (typeof col === 'string') {
          if (col.startsWith('limit') && old !== limit) {
            const [, i] = col.split('_');
            const date = this.source.days[+i];
            const { groupId, intervalId } = this.source.intervals[row];
            this.source.changes.push({
              groupId,
              intervalId,
              date,
              limit,
            });
          }
        }
      });
    }
  }
}
