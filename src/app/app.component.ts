import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonStateActions, CommonStateSelectors } from '@app/root-store/common';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs/operators';

import { Message } from './root-store/common/models/message.inerface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isSidebarOpen = true;

  showSnackBar$ = this.store.select(CommonStateSelectors.selectMessage).pipe(
    filter((m): m is Message => m !== null),
    tap(({ text, type }) =>
      this.snackBar.open(
        text,
        'Понятно',
        type === 'notify' ? { duration: 5000, panelClass: 'snack-bar-notify' } : { panelClass: 'snack-bar-error' }
      )
    )
  );

  constructor(private readonly store: Store, private snackBar: MatSnackBar) {
    this.store.dispatch(CommonStateActions.loadProfile());
  }
}
