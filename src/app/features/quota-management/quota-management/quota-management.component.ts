import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as _moment from 'moment';
import { Subscription } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

import { GridDirective } from '../components/data-grid/grid.directive';
import { ExportDateRangeComponent } from '../components/export-date-range/export-date-range.component';
import { QuotaModel } from '../models';
import { QuotasManagementStore } from './../store/quotas-management.store';

const moment = _moment;

export enum Period {
  Week = 7,
  Month = 30,
}

@Component({
  selector: 'app-quota-management',
  templateUrl: './quota-management.component.html',
  styleUrls: ['./quota-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotaManagementComponent implements OnDestroy {
  @HostBinding('class') cssClass = 'page-container';

  currentTime = moment(Date.now()).format('HH:mm DD.MM.yyyy');
  afterClosed!: Subscription;

  sapId$ = this.store.sapId$;
  groups$ = this.store.groups$;
  limits$ = this.store.limits$;
  moment$ = this.store.moment$.pipe(
    tap(() => {
      this.store.fetchQuotas();
      this.store.fetchLimits();
    })
  );

  @ViewChild('grid') grid!: GridDirective;

  constructor(private readonly store: QuotasManagementStore, public dialog: MatDialog) {
    this.store.fetchSettings();
  }

  ngOnDestroy(): void {
    this.afterClosed.unsubscribe();
  }

  save(): void {
    const quotas = this.grid.changes;
    if (quotas.length) {
      this.store.updateQuotas(quotas);
      this.grid.changes = [];
      this.currentTime = moment(Date.now()).format('HH:mm DD.MM.yyyy');
    }
  }

  export(): void {
    this.afterClosed = this.dialog
      .open(ExportDateRangeComponent)
      .afterClosed()
      .pipe(filter((a): a is { start: string; end: string; } => !!a && a.start && a.end))
      .subscribe((range) => this.store.exportToExcel(range));
  }

  copy(period: Period): void {
    const source = this.grid.quotas
      .map((a) => a.intervals.map((b) => b.limits))
      .reduce((p, c) => [...p, ...c], [])
      .reduce((p, c) => [...p, ...c], [])
      .map(({ reserve, ...a }) => ({ ...a }));

    const w1 = this.nextWeek(source);
    if (period === Period.Month) {
      const w2 = this.nextWeek(w1);
      const w3 = this.nextWeek(w2);
      const w4 = this.nextWeek(w3);
      const quotas = [...w1, ...w2, ...w3, ...w4];
      this.store.updateQuotas(quotas);
    } else {
      this.store.updateQuotas(w1);
    }
  }

  nextWeek(source: QuotaModel[]): QuotaModel[] {
    return source.map((a) => ({ ...a, date: moment(a.date, true).add(Period.Week, 'd').format() }));
  }

  clear(): void {
    this.store.loadQuotas([...this.grid.quotas]);
  }
}
