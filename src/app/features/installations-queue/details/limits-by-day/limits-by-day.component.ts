import { Component } from '@angular/core';

import { InstallationQueueStore } from '../../store/installation-queue.store';

@Component({
  selector: 'app-limits-by-day',
  template: `
    <div *ngFor="let item of regionLimitsByDay$ | async" fxLayout="column">
      <span *ngFor="let day of item.limits">{{ day.limit }} / {{ day.reserve }}</span>
    </div>
  `,
  styleUrls: ['./limits-by-day.component.scss'],
})
export class LimitsByDayComponent {
  regionLimitsByDay$ = this.store.regionLimitsByDay$;

  constructor(private readonly store: InstallationQueueStore) {}
}
