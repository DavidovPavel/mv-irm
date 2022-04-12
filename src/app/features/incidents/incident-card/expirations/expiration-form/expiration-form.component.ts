import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { IncidentCardStore } from '../../../store/incident-card.store';

@Component({
  selector: 'app-expiration-form',
  templateUrl: './expiration-form.component.html',
})
export class ExpirationFormComponent {
  form = new FormGroup({
    scores: new FormControl(this.data.scores, [Validators.pattern(/^\d+$/), Validators.required]),
    comment: new FormControl('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<ExpirationFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { id: number; scores: number; serviceCenterId: number; incidentRequestId: number },
    private readonly store: IncidentCardStore
  ) {}

  save(): void {
    if (this.form.valid) {
      const { scores, comment } = this.form.value;
      const { id, incidentRequestId, serviceCenterId } = this.data;
      this.store.saveExpirationScores({
        id,
        serviceCenterId,
        incidentRequestId,
        scores: +scores,
        comment,
      });
      this.dialogRef.close();
    } else {
      this.form.updateValueAndValidity();
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
