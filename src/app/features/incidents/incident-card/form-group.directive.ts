import { Directive, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { RequestFields } from './request-panel/request-fields';

@Directive({
  selector: '[appFormGroup]',
})
export class FormGroupDirective {
  form = this.fb.group({
    incidentNumber: ['', Validators.required],
    incidentRequestStatusType: this.fb.control({ value: '', disabled: true }),
    clientName: ['', Validators.required],
    clientPhone: ['', Validators.required],
    serviceCompanyName: this.fb.control({ value: '', disabled: true }),
    serviceCenterId: [''],
    serviceCenterName: [''],
    serviceCenter: [''],
    blameServiceCenterType: [''],
    incidentCreationReasonId: [''],
    responsibleEmployeeMail: ['', Validators.required],
    problemEssence: [''],
    expectedSolution: [''],
    departureDate: [''],
    comment: [''],
    commentFiles: this.fb.array([]),
    requestFiles: this.fb.array([]),
    filesToDelete: this.fb.array([]),
  });

  @Input('appFormGroup') set permissions(value: string[]) {
    const controls = this.form.controls;
    Object.keys(controls).forEach((key) => {
      const c = controls[key];
      const data = RequestFields.find((a) => a.name === key);
      if (c && data) {
        if (data.permission && value.includes(data.permission)) {
          c.enable();
        } else {
          c.disable();
        }
      }
    });
  }

  constructor(private fb: FormBuilder) {}
}
