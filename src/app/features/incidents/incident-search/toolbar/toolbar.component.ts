import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { IncidentStore } from '../../store/incident.store';

@Component({
  selector: 'app-incident-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  @Output() excel = new EventEmitter();
  @Output() expanded = new EventEmitter();
  @Output() changed = new EventEmitter();

  constructor(public store: IncidentStore) {}

  toExpanded(): void {
    this.expanded.emit();
  }

  startExcel(): void {
    this.excel.emit();
  }
}
