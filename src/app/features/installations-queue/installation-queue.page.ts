import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

import { InstallationQueueStore } from './store/installation-queue.store';

@Component({
  selector: 'app-installation-queue',
  templateUrl: './installation-queue.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallationQueueComponent {
  @HostBinding('class') cssClass = 'page-container';

  sapId$ = this.store.sapId$;

  constructor(private readonly store: InstallationQueueStore) {}
}
