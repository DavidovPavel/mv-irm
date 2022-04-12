import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Region } from '../store/models';

@Pipe({
  name: 'checkRegionQuota',
})
export class CheckRegionQuotaPipe implements PipeTransform {
  transform(value: Region): string | undefined {
    return value.limits.sort((a, b) => (moment(a.date).isBefore(b.date) ? -1 : 1)).find((a) => a.hasQuotas)?.date;
  }
}
