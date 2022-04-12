import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CityInfo } from '@app/features/dashboard/state/models/city-info.interface';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
})
export class CityListComponent implements OnInit {
  items: CityInfo[] = [];

  @Input() data!: CityInfo[];
  @Input() set filter(colors: string[]) {
    this.items = colors.length ? this.data.filter((a) => colors.includes(a.color)) : this.data;
  }

  @Output() current = new EventEmitter<CityInfo>();

  ngOnInit(): void {
    this.items = this.data;
  }

  setCity(item: CityInfo): void {
    this.current.emit(item);
  }
}
