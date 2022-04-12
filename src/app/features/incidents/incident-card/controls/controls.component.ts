import { Component, Inject, Input, OnDestroy } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { dateToString } from '@app/core/func/pure';
import { IRMPermissions } from '@app/models';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { IncidentRequestStatusTrigger } from '../../models';
import { IncidentCardStore } from '../../store/incident-card.store';
import { FormGroupDirective } from './../form-group.directive';
import { DialogCommentComponent } from './dialog-comment.component';

@Component({
  selector: 'app-incident-controls',
  templateUrl: './controls.component.html',
  styles: ['button {margin: 0 8px}'],
})
export class ControlsComponent implements OnDestroy {
  subscription!: Subscription;

  @Input() id!: number;

  constructor(
    private store: IncidentCardStore,
    public dialog: MatDialog,
    public formGroup: FormGroupDirective,
    @Inject(IRMPermissions) public permissions: typeof IRMPermissions
  ) {}

  save(): void {
    const form = this.formGroup.form;
    const commentFilesCtr = form.get('commentFiles') as FormArray;
    const requestFilesCtr = form.get('requestFiles') as FormArray;
    const filesToDeleteCtr = form.get('filesToDelete') as FormArray;
    const commentCtr = form.get('comment');

    const requestFiles: File[] = requestFilesCtr.value;
    const commentFiles: File[] = commentFilesCtr.value;
    const filesToDelete: number[] = filesToDeleteCtr.value;
    const departureDate = form.get('departureDate')?.disabled ? null : dateToString(form.get('departureDate')?.value);
    const comments = commentCtr?.value ? [commentCtr.value] : null;

    const data = {
      id: this.id,
      filesToDelete,
      commentFiles,
      requestFiles,
      departureDate,
      comments,
      ...form.value,
    };
    this.store.updateIncident(data);

    filesToDeleteCtr.clear();
    commentCtr?.setValue('');
    commentFilesCtr.clear();
    requestFilesCtr.clear();
  }

  sendTrigger(IncidentRequestUserEvent: IncidentRequestStatusTrigger): void {
    const comment = this.formGroup.form.get('comment')?.value;
    this.subscription = this.dialog
      .open(DialogCommentComponent, { width: '60%', data: { comment } })
      .beforeClosed()
      .pipe(filter((c) => c))
      .subscribe((comment) => {
        const data = {
          id: this.id,
          IncidentRequestUserEvent,
          comments: [comment],
        };
        this.store.updateRequestStatus(data);
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
