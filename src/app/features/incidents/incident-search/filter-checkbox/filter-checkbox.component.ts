import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { FilterDirective } from './../filter.directive';

@Component({
  selector: 'app-filter-checkbox',
  templateUrl: './filter-checkbox.component.html',
})
export class FilterCheckboxComponent extends FilterDirective implements OnInit {
  formControl = new FormControl();

  @Input() value = false;

  ngOnInit(): void {
    if (this.controlName) {
      const id = this.collector.form.controls[this.controlName].value;
      if (id) {
        this.add();
      }
    }
  }

  change(ch: MatCheckboxChange): void {
    if (ch.checked) {
      this.collector.form.controls[this.controlName].setValue(ch.checked);
      this.add();
    } else {
      this.collector.form.controls[this.controlName].setValue('');
      this.store.removeChip(this.controlName);
    }
    this.changed.emit();
  }

  add(): void {
    this.store.loadOne({ name: this.controlName, data: true });
    this.store.addChip({
      label: this.getLabel('да'),
      key: this.controlName,
    });
  }
}
