import { Component } from '@angular/core';

import { InstallationQueueStore } from './../../store/installation-queue.store';

@Component({
  selector: 'app-check-quotas',
  templateUrl: './check-quotas.component.html',
  styleUrls: ['./check-quotas.component.scss'],
})
export class CheckQuotasComponent {
  hasQuotas$ = this.store.hasQuotas$;

  constructor(private readonly store: InstallationQueueStore) {
    this.store.fetchCheckInitQuotas();
    this.store.fetchHeadQuotas();
    this.store.fetchHasQuotas();
  }
}
