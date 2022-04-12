import { Directive, Input } from '@angular/core';

import { IncidentCardStore } from './../../store/incident-card.store';

@Directive({
  selector: '[appNumberZnu]',
})
export class NumberZnuDirective {
  @Input('appNumberZnu') set numberZNU(value: string) {
    this.store.fetchZNUInfo(value);
  }

  constructor(private readonly store: IncidentCardStore) {}
}
