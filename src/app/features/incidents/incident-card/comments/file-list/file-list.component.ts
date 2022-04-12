import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray } from '@angular/forms';

import { IncidentFile } from './../../../models';

@Component({
  selector: 'app-incident-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
})
export class FileListComponent {
  @Input() reserveControl!: FormArray;
  @Input() dataSource: IncidentFile[] = [];
  @Input() disabled = true;

  @Output() add = new EventEmitter<File[]>();
  @Output() download = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  downloadFile(id: number): void {
    this.download.emit(id);
  }
}
