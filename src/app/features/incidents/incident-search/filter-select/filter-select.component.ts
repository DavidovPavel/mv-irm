import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { NumberItem } from '@app/models';

import { FilterDirective } from './../filter.directive';

@Component({
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html',
})
export class FilterSelectComponent extends FilterDirective implements OnInit {
  formValue!: NumberItem[] | null;

  @Input() multiple = false;
  @Input() set value(items: NumberItem[] | null) {
    this.formValue = items;
    if (items?.length) {
      this.store.addChip({
        label: this.getLabel(items.map((a) => a.name).join(', ')),
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

      this.store.fetchDictionary({ name: this.controlName, params: {} });
    }
  }

  selected(e: MatSelectChange): void {
    const items = e.value as NumberItem[];
    this.collector.form.controls[this.controlName].setValue(items.map((a) => a.id));
    if (items.length) {
      this.store.loadOne({ name: this.controlName, data: items });
      this.store.addChip({
        label: this.getLabel(items.map((a) => a.name).join(', ')),
        key: this.controlName,
      });
    } else {
      this.store.removeChip(this.controlName);
    }
    this.changed.emit();
  }
}
