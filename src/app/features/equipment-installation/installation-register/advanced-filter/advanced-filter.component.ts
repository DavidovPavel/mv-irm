import { ChipsManageService } from '@app/shared/chips-registry/chips-manage.service';
import { NumberItem } from '@app/models';

import { Component, EventEmitter, Output } from '@angular/core';

import { dictionaryName, InstallationRegisterStore } from './../../store/installation-registry.store';

type filterData = string | true | NumberItem | NumberItem[] | null;

@Component({
  selector: 'app-advanced-filter',
  templateUrl: './advanced-filter.component.html',
  styleUrls: ['./advanced-filter.component.scss'],
})
export class AdvancedFilterComponent {
  collection = new Map<dictionaryName, filterData>();

  @Output() apply = new EventEmitter<boolean>();

  constructor(readonly store: InstallationRegisterStore, private readonly chips: ChipsManageService) {
    this.store.fetchDictionary({ name: 'appealType' });
    this.store.fetchDictionary({ name: 'brand' });
    this.store.fetchDictionary({ name: 'shop' });
    this.store.fetchDictionary({ name: 'serviceCompany' });
  }

  applyFilter(): void {
    this.apply.emit(true);
  }

  collect(o: { name: dictionaryName; data: filterData }): void {
    this.store.loadOne(o);
    this.collection.set(o.name, o.data);
  }

  close(): void {
    Array.from(this.collection.keys()).forEach((name) => {
      this.chips.removeChip(name as unknown as string);
      this.store.loadOne({ name, data: null });
    });
    this.collection.clear();
    this.apply.emit(false);
  }

  clearFilter(): void {
    Array.from(this.chips.items.keys())
      .filter((a): a is dictionaryName => !!a)
      .forEach((name) => {
        this.chips.removeChip(name as unknown as string);
        this.store.loadOne({ name, data: null });
      });
    this.apply.emit(true);
  }
}
