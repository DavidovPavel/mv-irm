import { Color } from './../rating.service';
import { Component, HostBinding, Input } from '@angular/core';
import { CityInfo } from '@app/features/dashboard/state/models/city-info.interface';

import { RatingService } from '../rating.service';

@Component({
  selector: 'app-ball',
  template: '',
  styles: [
    `
      :host {
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 16px;
      }
    `,
  ],
})
export class BallComponent {
  @HostBinding('style.background') get bgColor(): string {
    return this.color;
  }

  @Input() color = '';

  /**
   * @deprecated in cities pipe
   */
  @Input() set data(a: CityInfo) {
    const count = a.serviceCentersCount;
    const sc = a.serviceCenters[0];
    this.color = this.service.setColor(count, sc);
  }

  constructor(private service: RatingService) {}
}
