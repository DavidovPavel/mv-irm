import { Component } from '@angular/core';
import { CommonStateSelectors } from '@app/root-store/common';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-preloader',
  template: `<ng-container *ngIf="status$ | async"
    ><mat-progress-bar mode="indeterminate"></mat-progress-bar
  ></ng-container>`,
  styles: [
    `
      :host {
        display: block;
        position: fixed;
        top: 60px;
        width: 100%;
        height: 4px;
      }
    `,
  ],
})
export class PreloaderComponent {
  status$ = this.store.select(CommonStateSelectors.selectIsShowPreloader);

  constructor(private readonly store: Store) {}
}
