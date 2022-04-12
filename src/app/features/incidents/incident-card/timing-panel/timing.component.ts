import { Component, Inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IRMPermissions } from '@app/models';

import { Incident } from '../../models';
import { ExpirationHistoryComponent } from '../expirations/expiration-history/expiration-history.component';

@Component({
  selector: 'app-timing-panel',
  templateUrl: './timing.component.html',
  styles: [':host {display: block; margin-bottom: 20px;}'],
})
export class TimingComponent {
  @Input() incident!: Incident;

  constructor(public dialog: MatDialog, @Inject(IRMPermissions) public permissions: typeof IRMPermissions) {}

  showExpirationHistory(): void {
    if (this.incident.expiration) {
      const { id, scores } = this.incident.expiration;
      const { incidentNumber, id: incidentRequestId } = this.incident;
      this.dialog.open(ExpirationHistoryComponent, {
        width: '80%',
        height: '80%',
        data: { id, incidentNumber, scores, incidentRequestId },
      });
    }
  }
}
