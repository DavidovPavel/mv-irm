import { Component, Input } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

import { UploadFileDirective } from '../../../directives/upload-file.directive';
import { IncidentFile } from '../../../models';
import { IncidentCardStore } from '../../../store/incident-card.store';
import { FormGroupDirective } from '../../form-group.directive';

@Component({
  selector: 'app-incident-request-files',
  templateUrl: './request-files.component.html',
  styleUrls: ['./request-files.component.scss'],
})
export class RequestFilesComponent extends UploadFileDirective {
  reserveControl = this.controlRequestFiles;

  @Input() dataSource!: IncidentFile[];

  constructor(public formGroup: FormGroupDirective, private readonly store: IncidentCardStore) {
    super();
  }

  downloadItem(file: IncidentFile): void {
    if (file.id) {
      this.store.downloadFile(file.id);
    }
  }

  removeItem(file: IncidentFile): void {
    this.dataSource = this.dataSource.filter((a) => a.file.name !== file.file.name || a.id !== file.id);
    if (file.id) {
      const c = this.formGroup.form.get('filesToDelete') as FormArray;
      c.push(new FormControl(file.id));
    }
  }

  get controlRequestFiles(): FormArray {
    return this.formGroup.form.get('requestFiles') as FormArray;
  }

  get disableAttachFile(): boolean {
    const c = this.formGroup.form.get('requestFiles');
    return c ? c.disabled : true;
  }
}
