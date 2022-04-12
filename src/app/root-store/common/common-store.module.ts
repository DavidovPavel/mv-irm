import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CommonStoreService } from './common-store.service';
import { CommonStoreEffects } from './common.effects';
import { reducer } from './common.reducer';
import { commonFeatureKey } from './common.state';

@NgModule({
  imports: [StoreModule.forFeature(commonFeatureKey, reducer), EffectsModule.forFeature([CommonStoreEffects])],
  providers: [CommonStoreService],
})
export class CommonStoreModule {}
