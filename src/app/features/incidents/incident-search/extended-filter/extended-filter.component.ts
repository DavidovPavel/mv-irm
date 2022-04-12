import { Component, EventEmitter, Output } from '@angular/core';
import { LocalStorageService } from '@app/core/services/local-storage.service';

import { FLAG_SHOP_PARAM, IncidentStore } from './../../store/incident.store';
import { SearchService } from './../search.service';

@Component({
  selector: 'app-incident-extended-filter',
  templateUrl: './extended-filter.component.html',
  styleUrls: ['./extended-filter.component.scss'],
})
export class IncidentExtendedFilterComponent {
  @Output() apply = new EventEmitter();

  constructor(public store: IncidentStore, private storage: LocalStorageService, public collector: SearchService) {}

  applyFilter(): void {
    this.collector.form.get('page')?.setValue(0);
    this.apply.emit();
  }

  clearFilter(): void {
    this.storage.setItem(FLAG_SHOP_PARAM, '');
    this.collector.form.reset();
    this.store.clearChips();
  }
}
