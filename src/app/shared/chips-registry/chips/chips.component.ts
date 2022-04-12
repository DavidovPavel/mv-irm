import { Component, EventEmitter, Output } from '@angular/core';

import { ChipsManageService } from './../chips-manage.service';

@Component({
  selector: 'app-chips-registry',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent {
  @Output() remove = new EventEmitter();
  constructor(readonly manage: ChipsManageService) {}

  removeChip(key: string): void {
    this.manage.removeChip(key);
    this.remove.emit(key);
  }

  trackByFn(index: number): number {
    return index;
  }
}
