import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ServisesProvidedEffects } from './effects';
import { reducer } from './reducer';
import { storeKey } from './state';

@NgModule({
  imports: [StoreModule.forFeature(storeKey, reducer), EffectsModule.forFeature([ServisesProvidedEffects])],
})
export class ServicesProvidedStoreModule {}
