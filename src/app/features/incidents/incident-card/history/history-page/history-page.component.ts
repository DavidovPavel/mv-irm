import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncidentCardStore } from '@app/features/incidents/store/incident-card.store';

import { HistoryEvent, historyEventName, IncidentHistory } from './../../../models/incident-history';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent {
  current = null;
  currentItem: IncidentHistory | null = null;

  @HostBinding('class') class = 'page-container';

  discs = [
    'IncidentRequestCreateEvent',
    'IncidentRequestAddFirstCommentEvent',
    'IncidentRequestAddDepartureDateEvent',
    'IncidentRequestCloseEvent',
  ];
  constructor(readonly store: IncidentCardStore, readonly route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.fetchHistory(+id);
    }
  }

  getTitle(e: historyEventName): string {
    return HistoryEvent[e];
  }

  details(item: IncidentHistory): void {
    console.log(item);
    this.currentItem = item;

    // if (item.snapshotId) {
    //   this.store.fetchHistoryDetails([item.aggregateId, item.snapshotId]);
    // }
  }

  back(): void {
    window.history.back();
  }
}
