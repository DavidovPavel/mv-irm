import { Component, HostBinding } from '@angular/core';
import { CityInfo } from '@app/features/dashboard/state/models/city-info.interface';
import { tap } from 'rxjs/operators';

import { Color, RatingService } from './rating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPageComponent {
  @HostBinding('class') class = 'page-container';

  colorsName: ['green', 'yellow', 'red'] = ['green', 'yellow', 'red'];
  Color = Color;
  colors: string[] = [];
  label = '';
  serviceCentersCount!: number;
  overallRank!: number;
  cities: string[] = [];

  profile$ = this.service.getProfile();
  serviceCompany$ = this.service.getServiceCompany();
  catalog$ = this.service.getCityCatalog().pipe(
    tap((a) => {
      const e = a.find((b) => b.city.name === this.service.City);
      if (e) {
        this.label = `${e.serviceCenters.map((b) => b.name).join(', ')}, г.${this.service.City}.`;
        this.serviceCentersCount = e.serviceCentersCount;
        this.overallRank = e.serviceCenters[0].overallRank;
      }
    })
  );
  metrics$ = this.service.getMetrics();
  marks$ = this.service.getMarks();

  constructor(private service: RatingService) {}

  setCity(item: CityInfo): void {
    this.service.setStorageByCity(item.city.name);
    this.label = `${item.serviceCenters.map((a) => a.name).join(', ')}, г.${item.city.name}.`;
    this.serviceCentersCount = item.serviceCentersCount;
    this.overallRank = item.serviceCenters[0].overallRank;
    console.log(item);
  }
}
