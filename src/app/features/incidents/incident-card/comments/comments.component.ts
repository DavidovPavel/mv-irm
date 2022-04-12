import { Component, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { IRMPermissions } from '@app/models';

import { IncidentCardStore } from '../../store/incident-card.store';
import { IncidentComment, IncidentFile } from './../../models';
import { FormGroupDirective } from './../form-group.directive';

@Component({
  selector: 'app-comments-files-panel',
  templateUrl: './comments.component.html',
})
export class CommentsComponent {
  @Input() id!: number;
  @Input() comments!: IncidentComment[];
  @Input() commentFiles!: IncidentFile[];
  @Input() permissions!: string[];

  constructor(private store: IncidentCardStore, public formGroup: FormGroupDirective) {}

  get disabledSendComment(): boolean {
    return !this.permissions.includes(IRMPermissions.IncidentEdit_comments);
  }

  get disableAttachFile(): boolean {
    return !this.permissions.includes(IRMPermissions.IncidentEdit_commentFiles);
  }

  get controlCommentFiles(): FormArray {
    return this.formGroup.form.get('commentFiles') as FormArray;
  }

  addComment(text: string): void {
    const data = {
      id: this.id,
      comments: [text],
    };
    this.store.updateRequestStatus(data);
  }

  addFiles(items: File[]): void {
    const data = { id: this.id, items };
    this.store.addToServiceCenterFileStores(data);
  }

  removeFileStores(id: number): void {
    const data = { id: this.id, filesToDelete: [id] };
    this.store.removeFromServiceCenterFileStores(data);
  }

  download(id: number): void {
    this.store.downloadFile(id);
  }
}
