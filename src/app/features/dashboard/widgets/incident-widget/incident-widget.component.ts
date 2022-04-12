import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { DashboardStoreActions, DashboardStoreSelectors } from './../../state';


@Component({
  selector: 'app-incident-widget',
  templateUrl: './incident-widget.component.html',
  styleUrls: ['../../styles/stat-card.scss'],
})
export class IncidentWidgetComponent {
  stats$ = this.store.select(DashboardStoreSelectors.selectIncidentsStatus);

  constructor(private store: Store) {
    this.store.dispatch(DashboardStoreActions.loadIncidentsStatus());
  }
}
