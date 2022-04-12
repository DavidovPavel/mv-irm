import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { nonNullable } from '@app/core/func/pure';
import { NumberItem } from '@app/models';
import { CommonStateActions } from '@app/root-store/common';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { EquipmentInstallation } from './equipment-installation.interface';
import { EquipmentInstallationService } from './equipment-installation.service';
import { Operation } from './models';

export interface InstallationCard {
  permissions: string[] | null;
  instance: EquipmentInstallation | null;
  files: NumberItem[] | null;
}

@Injectable()
export class InstallationCardStore extends ComponentStore<InstallationCard> {
  constructor(private api: EquipmentInstallationService, private readonly store: Store, private route: ActivatedRoute) {
    super({ permissions: null, instance: null, files: null });
  }

  /** selectors */
  readonly instance$ = this.select((state) => state.instance);
  readonly files$ = this.select((state) => state.files).pipe(nonNullable<NumberItem[]>());

  /** updaters */
  readonly loadInstance = this.updater((state, instance: EquipmentInstallation) => ({ ...state, instance }));
  readonly loadPermissions = this.updater((state, permissions: string[]) => ({ ...state, permissions }));
  readonly loadFiles = this.updater((state, files: NumberItem[]) => ({ ...state, files }));

  /** effects */
  readonly fetchPermissions = this.effect((a$) =>
    a$.pipe(
      switchMap(() => this.route.params),
      switchMap(({ id }) =>
        this.api.getPermissions(id).pipe(
          tapResponse(
            (result) => this.loadPermissions(result),
            (error) => this.showError('Ошибка загрузки разрешений для карточки.', error)
          )
        )
      )
    )
  );

  readonly fetchInstance = this.effect((a$) =>
    a$.pipe(
      switchMap(() => this.route.params),
      switchMap(({ id }) =>
        this.api.getEquipmentInstallation(id).pipe(
          tapResponse(
            (result) => this.loadInstance(result),
            (error) => this.showError('Ошибка загрузки данных для Заявки на установку.', error)
          )
        )
      )
    )
  );

  readonly updateInstance = this.effect((a$: Observable<Operation[]>) =>
    a$.pipe(
      switchMap((params) =>
        this.route.params.pipe(
          switchMap(({ id }) =>
            this.api.updateEquipmentInstallation(id, params).pipe(
              tapResponse(
                () => {
                  this.fetchPermissions();
                  this.fetchInstance();
                },
                (error) => this.showError('Ошибка сохранения данных для Заявки на установку.', error)
              )
            )
          )
        )
      )
    )
  );

  showError(text: string, error?: unknown): void {
    console.warn(text, error);
    this.store.dispatch(CommonStateActions.newMessage({ message: { type: 'error', text } }));
  }
}
