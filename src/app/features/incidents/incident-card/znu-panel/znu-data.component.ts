import { Component, Input } from '@angular/core';

import { Incident, SaleChannel } from '../../models';

enum ShopType {
  'mvideo' = 2,
  'eldorado' = 3,
}
@Component({
  selector: 'app-znu-panel',
  templateUrl: './znu-data.component.html',
  styles: [':host {display: block; margin-bottom: 20px;}'],
})
export class ZnuDataComponent {
  saleChannel = SaleChannel;

  @Input() incident!: Incident;

  get icon(): string {
    return `/Main/assets/img/icon-${ShopType[this.incident.shop.brand]}.png`;
  }
}
