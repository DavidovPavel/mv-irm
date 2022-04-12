import { Component, Input } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { IRMPermissions } from '@app/models';
import { IRM_DATETIME_FORMAT } from '@irm-ui/common';

import { FormGroupDirective } from './../form-group.directive';

@Component({
  selector: 'app-departure-date-panel',
  templateUrl: './departure-date.component.html',
  styleUrls: ['./departure-date.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: IRM_DATETIME_FORMAT }],
})
export class DepartureDateComponent {
  @Input() permissions!: string[];
  @Input() set departureDate(value: string) {
    const ctr = this.formGroup.form.get('departureDate');
    if (ctr) {
      ctr.setValue(value);
      this.permissions.includes(IRMPermissions.IncidentEdit_departureDate) ? ctr.enable() : ctr.disable();
    }
  }

  constructor(public formGroup: FormGroupDirective) {}
}
