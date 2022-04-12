import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MetricResponse } from '@app/features/dashboard/state/models/metrics-response.interface';
import { Subscription } from 'rxjs';

import { WEEK_COUNT } from '../chart/chart.component';
import { RatingService } from '../rating.service';

@Component({
  selector: 'app-grid',
  template: `
    <table>
      <tr>
        <th>% / Неделя</th>
        <th *ngFor="let item of weeks">{{ item.week }}</th>
      </tr>
      <tr *ngFor="let param of params; let i = index">
        <td>{{ param }} %</td>
        <td *ngFor="let item of weeks">{{ item.value[i] }}</td>
      </tr>
    </table>
  `,
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, OnDestroy {
  weeks!: { week: number; value: number[] }[];
  params = ['CSI', 'Инциденты', 'Возвраты'];
  citySubscribtion!: Subscription;

  @Input() metrics!: MetricResponse[];

  constructor(private service: RatingService) {}

  ngOnInit(): void {
    this.citySubscribtion = this.service.city$.subscribe((city) => this.reactionToCityChange(city));
    this.reactionToCityChange(this.service.City);
  }

  ngOnDestroy(): void {
    this.citySubscribtion.unsubscribe();
  }

  reactionToCityChange(city: string): void {
    if (city) {
      this.weeks = this.metrics
        .filter((a) => a.city === city)
        .map((a) => ({
          week: a.weekNumber,
          value: [a.weekCsiPerCity, a.weekIncPerCity, a.weekRetPerCity],
        }))
        .sort((a, b) => b.week - a.week)
        .slice(0, WEEK_COUNT)
        .reverse();
    } else {
      const first = this.metrics[0];
      if (first) {
        city = first.city;
        this.weeks = this.metrics
          .filter((a) => a.city === city)
          .map((a) => ({
            week: a.weekNumber,
            value: [a.weekCsiPerCompany, a.weekIncPerCompany, a.weekRetPerCompany],
          }))
          .sort((a, b) => b.week - a.week)
          .slice(0, WEEK_COUNT)
          .reverse();
      } else {
        this.weeks = [];
      }
    }
  }
}
