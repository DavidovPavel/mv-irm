import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Moment } from 'moment';
import * as _moment from 'moment';

import { Limit } from '../../models/limit.interface';
import { QuotasManagementStore } from '../../store/quotas-management.store';

const moment = _moment;

@Component({
  selector: 'app-quota-management-calendar',
  template: `<mat-calendar [(selected)]="selected"
    (selectedChange)="selectedChange($event)"
    (monthSelected)="monthSelected($event)"
  ></mat-calendar>`,
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements AfterViewInit {
  selected!: Date | null;
  isHandlerInit = false;
  monthCounter = 0;
  currentMonth = moment().month();
  currentYear = moment().year();

  @Input() set limits(data: Limit[] | null) {
    if (data) {
      this.markDayWithoutQuotas(data);
    }
  }

  @ViewChild(MatCalendar, { read: ElementRef }) calendar!: ElementRef;

  constructor(private store: QuotasManagementStore, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.calendar) {
      this.addHandlerButtons();
    }
  }

  addHandlerButtons(): void {
    if (!this.isHandlerInit) {
      this.isHandlerInit = true;
      const pervButton = document.querySelector('mat-calendar .mat-calendar-previous-button');
      const nextButton = document.querySelector('mat-calendar .mat-calendar-next-button');
      if (pervButton && nextButton) {
        this.renderer.listen(pervButton, 'click', () => this.prevEventListener());
        this.renderer.listen(nextButton, 'click', () => this.nextEventListener());
      }
    }
  }

  prevEventListener(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.fetchMoment();
  }

  nextEventListener(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.fetchMoment();
  }

  fetchMoment(): void {
    const date = moment({ y: this.currentYear, M: this.currentMonth, d: 1 });
    const start = date.startOf('month').toISOString();
    const end = date.endOf('month').toISOString();
    this.store.fetchMoment({ start, end });
  }

  markDayWithoutQuotas(limits: Limit[]): void {
    const daysInMonth = moment().month(this.currentMonth).daysInMonth();
    const cells = this.calendar.nativeElement.querySelectorAll('table td.mat-calendar-body-cell');
    new Array(daysInMonth)
      .fill(null)
      .forEach((_, i) =>
        this.dateClass(limits, i, moment({ y: this.currentYear, M: this.currentMonth, d: i + 1 }), cells)
      );
  }

  dateClass(limits: Limit[], index: number, d: Moment, cells: HTMLTableCellElement[]): void {
    if (limits.length) {
      const day = limits.find((a) => moment(a.date).isSame(d, 'day'));
      if (!day || day.limit === 0) {
        this.renderRed(cells, index);
      } else {
        this.clearRed(cells, index);
      }
    } else {
      this.renderRed(cells, index);
    }
  }

  renderRed(cells: HTMLTableCellElement[], index: number): void {
    const el = cells[index];
    this.renderer.addClass(el, 'day-without-quotas');
  }

  clearRed(cells: HTMLTableCellElement[], index: number): void {
    const el = cells[index];
    this.renderer.removeClass(el, 'day-without-quotas');
  }

  selectedChange(date: Moment): void {
    const day = date.toISOString();
    this.store.fetchMoment({ start: day, end: day });
  }

  monthSelected(date: Moment): void {
    const start = date.startOf('month').toISOString();
    const end = date.endOf('month').toISOString();
    this.store.fetchMoment({ start, end });
  }
}
