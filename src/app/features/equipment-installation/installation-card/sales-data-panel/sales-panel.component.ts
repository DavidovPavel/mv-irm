import { Component, Input } from '@angular/core';

import { EquipmentInstallation } from '../../store/equipment-installation.interface';

@Component({
  selector: 'app-sales-panel',
  templateUrl: './sales-panel.component.html',
  styleUrls: ['./sales-panel.component.scss'],
})
export class SalesPanelComponent {
  @Input()
  appeal!: EquipmentInstallation;

  get iconSrc(): string {
    return `/Main/assets/img/icon-${this.appeal.shopId === 2 ? 'mvideo' : 'eldorado'}.png`;
  }
}
