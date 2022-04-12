import { Component } from '@angular/core';
import { HistoryEvent } from '@app/features/incidents/models/incident-history';

import { IncidentCardStore } from './../../../store/incident-card.store';

@Component({
  selector: 'app-history-panel',
  templateUrl: './history-panel.component.html',
  styleUrls: ['./history-panel.component.scss'],
})
export class HistoryPanelComponent {
  event = HistoryEvent;
  discs = [
    'IncidentRequestCreateEvent',
    'IncidentRequestAddFirstCommentEvent',
    'IncidentRequestAddDepartureDateEvent',
    'IncidentRequestCloseEvent',
  ];
  constructor(readonly store: IncidentCardStore) {
    this.store.fetchHistory4Panel();
  }
}
