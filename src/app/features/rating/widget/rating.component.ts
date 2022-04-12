import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil, tap } from 'rxjs/operators';

import { RatingService } from '../rating.service';

@Component({
  selector: 'app-rating-widget',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [RatingService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingWidgetComponent implements OnDestroy {
  citySelect = new FormControl(this.service.City);
  cities: string[] = [];

  profile$ = this.service.getProfile();
  serviceCompany$ = this.service.getServiceCompany();
  catalog$ = this.service.getCityCatalog().pipe(tap((cities) => (this.cities = cities.map((a) => a.city.name))));
  metrics$ = this.service.getMetrics();
  marks$ = this.service.getMarks();

  destroy$$ = new Subject();
  filteredOptions: Observable<string[]>;

  constructor(private service: RatingService, private cd: ChangeDetectorRef) {
    this.service.city$.pipe(takeUntil(this.destroy$$)).subscribe((city) => {
      this.citySelect.setValue(city);
      this.cd.detectChanges();
    });

    this.filteredOptions = this.citySelect.valueChanges.pipe(
      startWith(''),
      map((value) => this.cities.filter((city) => city.toLowerCase().includes(value.toLowerCase())))
    );
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  onCity(e: MatAutocompleteSelectedEvent): void {
    this.service.setStorageByCity(e.option.value);
  }

  clear(): void {
    this.citySelect.setValue('');
  }

  checkValue(): void {
    if (!this.citySelect.value) {
      this.service.setStorageByCity('');
    }
  }
}
