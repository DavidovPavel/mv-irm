import { Component, HostBinding, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IRMPermissions } from '@app/models';
import { switchMap, tap } from 'rxjs/operators';

import { PermissionManagementService } from '../../../permission-management.service';
import { ExpirationHistoryGroups } from '../../../models/expiration.interface';
import { Incident } from '../../../models/incident.interface';
import { IncidentCardStore } from '../../../store/incident-card.store';
import { ExpirationFormComponent } from '../expiration-form/expiration-form.component';

@Component({
  selector: 'app-expiration-history',
  templateUrl: './expiration-history.component.html',
  styleUrls: ['./expiration-history.component.scss'],
})
export class ExpirationHistoryComponent {
  @HostBinding('class') class = 'page-container';

  id$ = this.route.paramMap.pipe(
    tap((a) => this.store.fetchIncidentId(a.get('id'))),
    switchMap(() => this.store.incidentId$),
    tap(() => {
      this.store.fetchPermissions();
      this.store.fetchIncident();
    })
  );

  incident$ = this.store.incident$.pipe(tap(({ id }) => this.store.fetchExpirationHistory({ incidentRequestId: id })));

  history$ = this.store.expirationHistory$;

  constructor(
    private dialog: MatDialog,
    private readonly store: IncidentCardStore,
    @Inject(IRMPermissions) public permissions: typeof IRMPermissions,
    private route: ActivatedRoute,
    public pms: PermissionManagementService
  ) {}

  showForm(incident: Incident, history: ExpirationHistoryGroups): void {
    const { expiration, id: incidentRequestId } = incident;
    const { scores, serviceCenterId } = history;
    if (expiration) {
      this.dialog.open(ExpirationFormComponent, {
        width: '80%',
        data: { ...expiration, scores, serviceCenterId, incidentRequestId },
      });
    }
  }

  back(): void {
    window.history.back();
  }
}
