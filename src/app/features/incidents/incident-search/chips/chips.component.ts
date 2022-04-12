import { Component, EventEmitter, Output } from '@angular/core';
import { LocalStorageService } from '@app/core/services/local-storage.service';

import { dictionaryName } from '../../store/incident-api.service';
import { FLAG_SHOP_PARAM, IncidentStore, SHOP_PARAM } from '../../store/incident.store';
import { SearchService } from './../search.service';

export interface Chip {
  label: string;
  key: dictionaryName;
}

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent {
  @Output() remove = new EventEmitter();

  constructor(private storage: LocalStorageService, public store: IncidentStore, public collector: SearchService) {}

  removeChip(chip: Chip): void {
    this.checkOnShop(chip.key);
    this.collector.form.controls[chip.key].setValue('');
    this.store.removeChip(chip.key);
    this.remove.emit();
  }

  checkOnShop(name: string): void {
    if (name === SHOP_PARAM) {
      const shopId = this.storage.getItem(SHOP_PARAM);
      if (shopId && `${this.collector.form.controls[name].value}` === shopId) {
        this.storage.setItem(FLAG_SHOP_PARAM, this.collector.form.controls[name].value);
      }
    }
  }
}
