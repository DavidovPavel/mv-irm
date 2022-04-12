import { Component, EventEmitter, Output } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { CommonStateActions, CommonStateSelectors } from '@app/root-store/common';
import { RootState } from '@app/root-store/root-state';
import { Store } from '@ngrx/store';
import { debounceTime, tap } from 'rxjs/operators';

const DEBOUNCE_TIME_PARAM_MSEC = 50;

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss'],
})
export class SidebarComponent {
  version = '0.01';
  isSidebarOpened = true;

  media$ = this.mediaObserver.asObservable().pipe(
    debounceTime(DEBOUNCE_TIME_PARAM_MSEC),
    tap((a) => {
      const flag = a.some((b) => b.mqAlias === 'gt-sm');
      this.isSidebarOpened = flag;
      this.sidebarOpen.emit(flag);
    })
  );

  permissions$ = this.store
    .select(CommonStateSelectors.selectIsPermissionsLoad)
    .pipe(tap(() => this.store.dispatch(CommonStateActions.loadLeftMenu())));

  menuItems$ = this.store.select(CommonStateSelectors.selectLeftMenu);

  @Output() sidebarOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public mediaObserver: MediaObserver, private store: Store<RootState>) {}

  toggleSidebar(): void {
    this.isSidebarOpened = !this.isSidebarOpened;
    this.sidebarOpen.emit(this.isSidebarOpened);
  }
}
