import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface DialogData {
  comment: string;
}

@Component({
  selector: 'app-incident-dialog-comment',
  template: `
    <mat-form-field class="full-width">
      <mat-label>Добавьте комментарий</mat-label>
      <textarea matInput [(ngModel)]="data.comment" required></textarea>
    </mat-form-field>
    <p [style.textAlign]="'right'">
      <button mat-stroked-button color="primary" (click)="close()" cdkFocusInitial>Отправить</button>
    </p>
  `,
  styles: [':host {display: block}'],
})
export class DialogCommentComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<DialogCommentComponent>
  ) {}

  close(): void {
    if (this.data.comment?.trim()) {
      this.dialogRef.close(this.data.comment);
    }
  }
}
