import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

import { CommonStoreModule } from './common/common-store.module';
import { ServicesProvidedStoreModule } from './services-provided/services-provided.module';

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    CommonStoreModule,
    ServicesProvidedStoreModule,
  ],
})
export class RootStoreModule {}
