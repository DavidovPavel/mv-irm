import { RegionLimits } from './../../store/models';
import { Pipe, PipeTransform } from '@angular/core';
import { Limit } from '../../store/models';
import * as moment from 'moment';

@Pipe({
  name: 'intervalByDay',
})
export class IntervalByDayPipe implements PipeTransform {
  transform(value: RegionLimits[] | undefined, day: string): Limit[] {
    if (value) {
      return value.find((a) => moment(a.date).isSame(day))?.limits ?? [];
    }
    return [];
  }
}
