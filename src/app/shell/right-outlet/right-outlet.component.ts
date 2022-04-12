import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonStateSelectors } from '@app/root-store/common';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-right-outlet',
  templateUrl: './right-outlet.component.html',
  styleUrls: ['./right-outlet.component.scss'],
})
export class RightOutletComponent {
  @HostBinding('class') cssClass = 'page-container';

  profile$ = this.store.select(CommonStateSelectors.selectProfile);

  constructor(private readonly store: Store) {}
}
