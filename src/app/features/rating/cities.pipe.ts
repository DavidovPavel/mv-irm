import { Pipe, PipeTransform } from '@angular/core';
import { CityInfo } from '@app/features/dashboard/state/models/city-info.interface';

import { RatingService } from './rating.service';

@Pipe({
  name: 'cities',
  pure: true,
})
export class CitiesPipe implements PipeTransform {

  constructor(private service: RatingService) {}

  transform(value: CityInfo[]): CityInfo[] {
    return value.map((a) => {
      const count = a.serviceCentersCount;
      const sc = a.serviceCenters[0];
      const color = this.service.setColor(count, sc);
      return { ...a, color };
    });
  }
}
