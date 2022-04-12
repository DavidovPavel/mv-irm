import { Component, HostBinding, Input } from '@angular/core';
import * as moment from 'moment';

import { Limit, Region } from '../../store/models';

@Component({
  selector: 'app-limits',
  templateUrl: './limits.component.html',
  styleUrls: ['./limits.component.scss'],
})
export class LimitsComponent {
  limit!: Partial<Limit>;
  intervals!: Limit[];
  hasQuotas!: boolean;

  @Input() day!: string;

  @Input() set region(value: Region) {
    this.hasQuotas = value.hasQuotas;
    this.limit = value.limits?.find((a) => moment(a.date).isSame(this.day)) ?? {};
    this.intervals = value.intervalLimits?.find((a) => moment(a.date).isSame(this.day))?.limits ?? [];
  }

  @HostBinding('class') get css(): string {
    return this.limit.inPeriod && this.hasQuotas === false ? 'day warn' : 'day';
  }
}
