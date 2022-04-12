import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { nonNullable } from '@app/core/func/pure';
import { Profile } from '@app/models';
import { CommonStateActions, CommonStateSelectors } from '@app/root-store/common';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { Tile } from '../state/models/dashboard-tile.interface';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardService],
})
export class DashboardComponent {
  @HostBinding('class') css = 'page-container';
  tilesTop!: Tile[];
  tilesBottom!: Tile[];

  profile$ = this.store.select(CommonStateSelectors.selectProfile).pipe(
    nonNullable<Profile>(),
    tap((profile) => this.initTiles(profile.roles))
  );

  serviceCompany$ = this.store.select(CommonStateSelectors.selectServiceCompany);

  constructor(private store: Store, private service: DashboardService) {
    this.store.dispatch(CommonStateActions.loadProfile());
  }

  initTiles(roles: number[] | null): void {
    if (roles) {
      const data = this.service.getTiles(roles);
      this.tilesTop = data.slice(0, 4);
      this.tilesBottom = data.slice(4);
    }
  }
}
