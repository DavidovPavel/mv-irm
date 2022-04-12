import { Component, OnDestroy } from '@angular/core';
import { nonNullable } from '@app/core/func/pure';
import { DashboardStoreActions, DashboardStoreSelectors } from '@app/features/dashboard/state';
import { IRMUserRole, Profile } from '@app/models';
import { CommonStateSelectors } from '@app/root-store/common';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-equipment-installation',
  templateUrl: '../statistic.component.html',
  styleUrls: ['../../styles/stat-card.scss'],
})
export class EquipmentInstallationComponent {
  profile$ = this.store.select(CommonStateSelectors.selectProfile).pipe(
    nonNullable<Profile>(),
    filter(({ roles }) => !!roles?.includes(IRMUserRole.ServiceCompany)),
    tap(() => this.store.dispatch(DashboardStoreActions.loadInstallationStatus()))
  );

  stats$ = this.store.select(DashboardStoreSelectors.selectInstallationStats);

  constructor(private readonly store: Store) {}
}
