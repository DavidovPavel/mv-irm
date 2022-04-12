import { Component, Input } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

import { FilterDirective } from './../filter.directive';

@Component({
  selector: 'app-filter-datepicker',
  templateUrl: './filter-datepicker.component.html',
})
export class FilterDatepickerComponent extends FilterDirective {
  formValue = '';
  @Input() set value(item: string | null) {
    this.formValue = item ?? '';
    if (item) {
      this.cm.addChip(this.controlName, {
        label: this.getLabel(moment(item).format('DD.MM.yyyy')),
        value: item,
      });
    }
  }

  dateChange(e: MatDatepickerInputEvent<Date>): void {
    const value = e.value ? e.value.toISOString() : '';
    if (value) {
      this.cm.addChip(this.controlName, { label: this.getLabel(moment(value).format('DD.MM.yyyy')), value });
    } else {
      this.cm.removeChip(this.controlName);
    }
    this.changed.emit(value);
  }
}
