import { Component, Input } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { NumberItem } from '@app/models';

import { FilterDirective } from '../filter.directive';

@Component({
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html',
})
export class FilterSelectComponent extends FilterDirective {
  formValue!: NumberItem | NumberItem[] | null;

  @Input() multiple = false;
  @Input() set value(data: NumberItem | NumberItem[] | null) {
    this.formValue = data;
    if (data) {
      this.addChip(data);
    }
  }

  selected(e: MatSelectChange): void {
    this.addChip(e.value);
    this.changed.emit(e.value);
  }

  addChip(data: NumberItem | NumberItem[]): void {
    if (Array.isArray(data)) {
      const items = data as NumberItem[];
      if (items.length) {
        const label = this.getLabel(items.map((a) => a.name).join(', '));
        const value = items.map((a) => `${a.id}`).join(',');
        this.cm.addChip(this.controlName, { label, value });
      } else {
        this.cm.removeChip(this.controlName);
      }
    } else {
      const item = data as NumberItem;
      this.cm.addChip(this.controlName, { label: this.getLabel(item.name), value: `${item.id}` });
    }
  }
}
