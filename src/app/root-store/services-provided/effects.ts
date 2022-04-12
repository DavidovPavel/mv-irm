import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { RootState } from '../root-state';
import { ServicesProvidedService } from './services-provided.service';

@Injectable()
export class ServisesProvidedEffects {
  constructor(private actions$: Actions, private service: ServicesProvidedService, private store: Store<RootState>) {}

  // getServices$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(actions.getServices),
  //     pluck('value'),
  //     debounceTime(200),
  //     filter((name) => typeof name === 'string'),
  //     distinctUntilChanged(),
  //     switchMap((name) =>
  //       this.store.select(EquipmentInstallationStoreSelectors.selectInstance).pipe(
  //         switchMap((e) =>
  //           this.service.getServices(name, e as EquipmentInstallation).pipe(
  //             map((data) => actions.getServicesSuccess({ data })),
  //             catchError((error) => of(actions.getServicesFailure({ error })))
  //           )
  //         )
  //       )
  //     )
  //   )
  // );
}
