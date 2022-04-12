import { Component, Input } from '@angular/core';

import { UploadFileDirective } from '../../directives/upload-file.directive';

@Component({
  selector: 'irm-incident-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent extends UploadFileDirective {
  @Input() disabled = true;
}
