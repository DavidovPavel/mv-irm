import { Component } from '@angular/core';
import { CommonStateSelectors } from '@app/root-store/common';
import { Store } from '@ngrx/store';

import { DashboardStoreActions, DashboardStoreSelectors } from '../../state';

@Component({
  selector: 'app-digital-assistant-outside',
  templateUrl: '../statistic.component.html',
  styleUrls: ['../../styles/stat-card.scss'],
})
export class DigitalAssistantOutsideComponent {
  profile$ = this.store.select(CommonStateSelectors.selectProfile);
  stats$ = this.store.select(DashboardStoreSelectors.selectAssistantStats);

  constructor(private readonly store: Store) {
    this.store.dispatch(DashboardStoreActions.loadAssistantStatus());
  }
}
