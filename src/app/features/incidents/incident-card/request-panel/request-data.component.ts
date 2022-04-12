import { Component, Inject, Input } from '@angular/core';
import { bodyExpansion } from '@app/core/animations/bodyExpansion';
import { IRMPermissions } from '@app/models';

import { Incident, IncidentFile } from '../../models';
import { IncidentCardStore } from '../../store/incident-card.store';
import { FormGroupDirective } from './../form-group.directive';

@Component({
  selector: 'app-request-panel',
  templateUrl: './request-data.component.html',
  styleUrls: ['./request-data.component.scss'],
  animations: [bodyExpansion],
})
export class RequestDataComponent {
  panelOpenState = false;

  @Input() incident!: Incident;

  constructor(
    public readonly store: IncidentCardStore,
    public formGroup: FormGroupDirective,
    @Inject(IRMPermissions) public permissions: typeof IRMPermissions
  ) {}

  download(file: IncidentFile): void {
    if (file.id) {
      this.store.downloadFile(file.id);
    }
  }
}
