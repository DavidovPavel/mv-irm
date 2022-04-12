import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { NumberItem } from '@app/models';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { FilterDirective } from './../filter.directive';

@Component({
  selector: 'app-filter-autocomplete',
  templateUrl: './filter-autocomplete.component.html',
})
export class FilterAutocompleteComponent extends FilterDirective {
  formControl = new FormControl();
  formValue = '';
  valueChange$ = this.formControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap((name) => {
      if (typeof name === 'string') {
        this.changing.emit(name);
      }
    })
  );

  @Input() set value(item: NumberItem | null) {
    this.formValue = item?.name ?? '';
    if (item) {
      this.cm.addChip(this.controlName, {
        label: this.getLabel(item.name),
        value: `${item.id}`,
      });
    }
  }

  @Output() changing = new EventEmitter<string>();

  displayFn(item: NumberItem): string {
    return item?.name ?? '';
  }

  selected(e: MatAutocompleteSelectedEvent): void {
    const item = e.option.value as NumberItem;
    this.cm.addChip(this.controlName, {
      label: this.getLabel(item.name),
      value: `${item.id}`,
    });
    this.changed.emit(item);
  }

  clear(): void {
    if (!this.formControl.value) {
      this.cm.removeChip(this.controlName);
      this.changed.emit(null);
    }
  }
}
