import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { DashboardEffects } from './dashboard.effects';
import { reducer, storeKey } from './dashboard.reducer';
import { DashboardService } from './dashboard.service';

@NgModule({
  imports: [StoreModule.forFeature(storeKey, reducer), EffectsModule.forFeature([DashboardEffects])],
  providers: [DashboardService],
})
export class DashboardStoreModule {}
