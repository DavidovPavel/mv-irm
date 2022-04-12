import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

import { RootState } from '../root-state';
import { CommonStoreService } from './common-store.service';
import {
  loadLeftMenu,
  loadLeftMenuSuccess,
  loadPermissions,
  loadPermissionsSuccess,
  loadProfile,
  loadProfileFailure,
  loadProfileSuccess,
  loadServiceCompany,
  loadServiceCompanyFailure,
  loadServiceCompanySuccess,
  loadZNUInfo,
  loadZNUInfoFail,
  loadZNUInfoSuccess,
} from './common.actions';
import { selectIsPermissionsLoad, selectProfileLoaded } from './common.selectors';

@Injectable()
export class CommonStoreEffects {
  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProfile),
      concatLatestFrom(() => this.store.select(selectProfileLoaded)),
      switchMap(([, loaded]) =>
        loaded
          ? EMPTY
          : this.service.getProfile().pipe(
              tap(({ roles }) => this.store.dispatch(loadPermissions({ roles }))),
              tap(({ serviceCompanyId }) => {
                if (serviceCompanyId) {
                  this.store.dispatch(loadServiceCompany({ serviceCompanyId }));
                }
              }),
              map((profile) => loadProfileSuccess({ profile })),
              catchError((error) => of(loadProfileFailure({ error })))
            )
      )
    )
  );

  loadServiceCompany$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadServiceCompany),
      switchMap(({ serviceCompanyId }) =>
        this.service.getServiceCompany(serviceCompanyId).pipe(
          map((serviceCompany) => loadServiceCompanySuccess({ serviceCompany })),
          catchError((error) => of(loadServiceCompanyFailure({ error })))
        )
      )
    );
  });

  loadPermissions = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPermissions),
      switchMap((data) =>
        this.service
          .loadPermissions(data.roles)
          .pipe(map((isPermissionsLoad) => loadPermissionsSuccess({ isPermissionsLoad })))
      )
    )
  );

  loadLeftMenu = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLeftMenu),
      concatLatestFrom(() => this.store.select(selectIsPermissionsLoad).pipe(filter((a) => a))),
      switchMap(() => this.service.getLeftMenu().pipe(map((leftMenu) => loadLeftMenuSuccess({ leftMenu }))))
    )
  );

  loadZNUInfo = createEffect(() =>
    this.actions$.pipe(
      ofType(loadZNUInfo),
      switchMap(({ couponNumber }) =>
        this.service.loadZNUInfo(couponNumber).pipe(
          map((znuInfo) => loadZNUInfoSuccess({ znuInfo })),
          catchError((error) => of(loadZNUInfoFail({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private store: Store<RootState>, private service: CommonStoreService) {}
}
