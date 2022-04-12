import { Component, HostBinding, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRMPermissions } from '@app/models';
import { switchMap, tap } from 'rxjs/operators';

import { IncidentCardStore } from './../store/incident-card.store';

@Component({
  selector: 'app-incident-card',
  templateUrl: './incident-card.component.html',
  styles: ['.page-content {padding-top: 10px}'],
})
export class IncidentCardComponent {
  @HostBinding('class') class = 'page-container';

  id$ = this.route.paramMap.pipe(
    tap((a) => this.store.fetchIncidentId(a.get('id'))),
    switchMap(() => this.store.incidentId$),
    tap(() => {
      this.store.fetchPermissions();
      this.store.fetchIncident();
    })
  );

  incident$ = this.store.incident$;

  permissions$ = this.store.permissions$;

  constructor(
    private readonly store: IncidentCardStore,
    private route: ActivatedRoute,
    @Inject(IRMPermissions) public perm: typeof IRMPermissions
  ) {
    this.store.fetchCreateReasonProp();
  }

  back(): void {
    window.history.back();
  }
}
