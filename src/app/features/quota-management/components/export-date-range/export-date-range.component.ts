import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Moment } from 'moment';

@Component({
  selector: 'app-export-date-range',
  templateUrl: './export-date-range.component.html',
})
export class ExportDateRangeComponent {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(public dialogRef: MatDialogRef<ExportDateRangeComponent>) {}

  closeDialog(): void {
    const s = this.range.get('start')?.value as Moment;
    const e = this.range.get('end')?.value as Moment;
    if (s && e) {
      this.dialogRef.close({ start: s.toISOString(), end: e.toISOString() });
    }
  }
}
