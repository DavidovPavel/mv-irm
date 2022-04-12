import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { NumberItem } from '@app/models';
import { Observable } from 'rxjs';
import { distinctUntilChanged, startWith, tap } from 'rxjs/operators';

import { FilterDirective } from './../filter.directive';

@Component({
  selector: 'app-filter-autocomplete',
  templateUrl: './filter-autocomplete.component.html',
})
export class FilterAutocompleteComponent extends FilterDirective implements OnInit {
  formValue = '';
  formControl = new FormControl();
  valueChange$!: Observable<string>;

  @Input() set value(item: NumberItem | null) {
    this.formValue = item?.name ?? '';
    if (item) {
      this.store.addChip({
        label: this.getLabel(item.name),
        key: this.controlName,
      });
    }
  }

  ngOnInit(): void {
    if (this.controlName) {
      const id = this.collector.form.controls[this.controlName].value;
      if (id !== '') {
        this.store.fetchOne({ name: this.controlName, id });
      }

      this.valueChange$ = this.formControl.valueChanges.pipe(
        startWith(''),
        distinctUntilChanged(),
        tap((name) => this.store.fetchDictionary({ name: this.controlName, params: { name } }))
      );
    }
  }

  displayFn(item: NumberItem): string {
    return item?.name ?? '';
  }

  selected(e: MatAutocompleteSelectedEvent): void {
    const item = e.option.value as NumberItem;
    this.collector.form.controls[this.controlName].setValue(`${item.id}`);
    this.store.loadOne({ name: this.controlName, data: item });
    this.store.addChip({
      label: this.getLabel(item.name),
      key: this.controlName,
    });
    this.changed.emit();
  }

  clear(): void {
    if (!this.formControl.value) {
      this.collector.form.controls[this.controlName].setValue('');
      this.changed.emit();
    }
  }
}
