import { Component, OnInit } from '@angular/core';
import { DashboardStoreActions } from '@app/features/dashboard/state';
import { RootState } from '@app/root-store/root-state';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

import { DashboardStoreSelectors } from '../../state';

@Component({
  selector: 'app-appeal-states-closed',
  template: `
    <mat-card fxFlex fxLayout="column">
      <div fxLayoutAlign="space-between center">
        <mat-card-title>{{ percent$ | async }}%</mat-card-title>
        <mat-icon>chat_bubble_outline</mat-icon>
      </div>
      <mat-card-content> Процент закрытия заявок по СМС </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./appeal-states-closed.component.scss'],
})
export class AppealStatesClosedComponent implements OnInit {
  percent$ = this.store.select(DashboardStoreSelectors.selectMasterAppealsClosedState).pipe(filter((a) => !!a));

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.store.dispatch(DashboardStoreActions.loadMasterAppealsClosedState());
  }
}
