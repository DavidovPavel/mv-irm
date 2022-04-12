import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CityInfo } from '@app/features/dashboard/state/models/city-info.interface';
import { ServiceCenterMetric } from '@app/features/dashboard/state/models/service-center-metric.interface';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { Subscription } from 'rxjs';

import { Color, MAP_PARAMS, RatingService } from '../rating.service';

const ZOOM_DEFAULT = 8;
const DURATION_MSEC = 300;

interface Point {
  city: string;
  coords?: number[];
  count: number;
  sCenter: ServiceCenterMetric;
}
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  city: Point[] = [];
  citySubscribtion!: Subscription;
  map!: ymaps.Map;
  objectManager!: ymaps.ObjectManager;

  @Input() set metrics(value: CityInfo[]) {
    const cities = new Set<Point>();
    value.forEach((a) =>
      cities.add({
        city: a.city.name,
        count: a.serviceCentersCount,
        sCenter: a.serviceCenters[0],
      })
    );
    this.city = Array.from(cities);
  }

  constructor(private service: RatingService) {}

  ngOnInit(): void {
    this.citySubscribtion = this.service.city$.subscribe((city) => this.reactionToCityChange(city));
  }

  ngOnDestroy(): void {
    this.citySubscribtion.unsubscribe();
  }

  reactionToCityChange(city: string): void {
    const point = this.city.find((a) => a.city === city);
    if (point?.coords) {
      this.map.setCenter(point.coords, ZOOM_DEFAULT, { duration: DURATION_MSEC });
    } else {
      this.map.setBounds(this.objectManager.getBounds() ?? []);
    }
  }

  selectCity(e: ymaps.IEvent): void {
    const objectId = e.get('objectId');
    if (objectId) {
      const o = this.objectManager.objects.getById(+objectId) as { properties: { hintContent: string } } | null;
      const city = o?.properties.hintContent ?? '';
      this.service.setStorageByCity(city);
    }
  }

  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    this.map = event.target;
    const promise = this.prepareData();

    this.map.events.add(['boundschange'], () => {
      const p = { center: this.map.getCenter(), zoom: this.map.getZoom() };
      this.service.setStorageByZoom(p);
    });

    this.objectManager = new ymaps.ObjectManager({});

    promise.then((points: Point[]) => {
      this.objectManager.objects.options.set('preset', 'islands#blueCircleIcon');
      this.objectManager.objects.events.add(['mousedown'], (e) => this.selectCity(e));

      points.forEach((point, index) => {
        const iconColor = this.service.setColor(point.count, point.sCenter);
        this.objectManager.add({
          type: 'Feature',
          id: index + 1,
          geometry: {
            type: 'Point',
            coordinates: point.coords,
          },
          properties: {
            hintContent: point.city,
            iconContent: point.sCenter.overallRank,
          },
          options: {
            iconColor,
            zIndex: Color.red === iconColor ? 3 : Color.yellow === iconColor ? 2 : 1,
          },
        });
      });

      this.map.geoObjects.add(this.objectManager);

      const params = localStorage.getItem(MAP_PARAMS);
      if (params) {
        const p = JSON.parse(params);
        this.reactionToCityChange(p.city);
      } else {
        this.map.setBounds(this.objectManager.getBounds() ?? []);
      }
    });
  }

  prepareData(): Promise<Point[]> {
    return new Promise((resolve) => {
      const points: Point[] = [];

      Array.from(this.city).forEach(async (a, i, s) => {
        const result = await ymaps.geocode(a.city, { results: 1 });
        const firstGeoObject = (result as any).geoObjects.get(0);
        const coords = firstGeoObject.geometry.getCoordinates();
        a.coords = coords;
        points.push({ city: a.city, coords, sCenter: a.sCenter, count: a.count });
        if (points.length === s.length) {
          resolve(points);
        }
      });
    });
  }
}
