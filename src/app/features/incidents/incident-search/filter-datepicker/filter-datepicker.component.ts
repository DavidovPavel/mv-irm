import { Component, Input, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

import { FilterDirective } from './../filter.directive';

@Component({
  selector: 'app-filter-datepicker',
  templateUrl: './filter-datepicker.component.html',
})
export class FilterDatepickerComponent extends FilterDirective implements OnInit {
  formValue = '';
  @Input() set value(item: string | null) {
    this.formValue = item ?? '';
    if (item) {
      this.store.addChip({
        label: this.getLabel(item),
        key: this.controlName,
      });
    }
  }

  getLabel(name: string): string {
    return `${this.label}: ${moment(name).format('DD.MM.yyyy')}`;
  }

  ngOnInit(): void {
    if (this.controlName) {
      const id = this.collector.form.controls[this.controlName].value;
      if (id) {
        this.store.loadOne({ name: this.controlName, data: `${id}` });
      }
    }
  }

  dateChange(e: MatDatepickerInputEvent<Date>): void {
    const item = e.value ? e.value.toISOString() : '';
    this.collector.form.controls[this.controlName].setValue(item);
    this.store.loadOne({ name: this.controlName, data: item });
    if (item) {
      this.store.addChip({ key: this.controlName, label: this.getLabel(item) });
    } else {
      this.store.removeChip(this.controlName);
    }
  }
}
