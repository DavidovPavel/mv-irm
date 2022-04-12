import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { InstallationRegisterStore } from './../../store/installation-registry.store';

@Component({
  selector: 'app-registry-toolbar',
  templateUrl: './registry-toolbar.component.html',
  styleUrls: ['./registry-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistryToolbarComponent {
  @Output() excel = new EventEmitter();
  @Output() expanded = new EventEmitter();
  @Output() apply = new EventEmitter();

  constructor(public readonly store: InstallationRegisterStore) {
    this.store.fetchDictionary({ name: 'serviceStatus' });
    this.store.fetchDictionary({ name: 'serviceCenter' });
    this.store.fetchDictionary({ name: 'city' });
  }

  toExpanded(): void {
    this.expanded.emit();
  }

  startExcel(): void {
    this.excel.emit();
  }
}
