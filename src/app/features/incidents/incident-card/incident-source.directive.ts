import { Directive, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Incident } from './../models/incident.interface';
import { FormGroupDirective } from './form-group.directive';

@Directive({
  selector: '[appIncidentSource]',
})
export class IncidentSourceDirective {
  @Input('appIncidentSource') set incident(source: Incident) {
    source.incidentCreationReasonId = source.incidentCreationReason.id;
    const controls = this.formGroup.form.controls;
    Object.keys(controls).forEach((key) => {
      const c = controls[key];
      if (c instanceof FormControl) {
        c.setValue(source[key as keyof Incident]);
      }
    });
  }

  constructor(private formGroup: FormGroupDirective) {}
}
