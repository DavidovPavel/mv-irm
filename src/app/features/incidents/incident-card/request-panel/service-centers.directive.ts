import { Directive, Host, OnDestroy, OnInit } from '@angular/core';
import { NumberItem } from '@app/models';
import { AutocompleteComponent, FormControlDirective } from '@irm-ui/common';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';

import { IncidentCardStore } from './../../store/incident-card.store';

@Directive({
  selector: '[appServiceCenters]',
})
export class ServiceCentersDirective implements OnInit, OnDestroy {
  valueChange!: Subscription;

  constructor(
    private readonly store: IncidentCardStore,
    private formControl: FormControlDirective,
    @Host() private host: AutocompleteComponent
  ) {}

  ngOnInit(): void {
    this.valueChange = this.host.control.valueChanges
      .pipe(startWith(''), debounceTime(300), distinctUntilChanged())
      .subscribe((name: string | NumberItem) => {
        if (typeof name === 'string') {
          this.store.fetchServiceCenters(name);
        } else if (name) {
          this.formControl.form.get('serviceCenterId')?.setValue(name.id);
        }
      });
  }

  ngOnDestroy(): void {
    this.valueChange.unsubscribe();
  }
}
