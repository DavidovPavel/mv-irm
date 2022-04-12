import { RightOutletModule } from './../../shell/right-outlet/right-outlet.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { DashboardStoreModule } from '@app/features/dashboard/state/dashboard-store.module';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';

import { BallComponent } from './ball/ball.component';
import { BarComponent } from './bar/bar.component';
import { ChartComponent } from './chart/chart.component';
import { CitiesPipe } from './cities.pipe';
import { CityListComponent } from './city-list/city-list.component';
import { GridComponent } from './grid/grid.component';
import { MapComponent } from './map/map.component';
import { RatingRoutingModule } from './rating-routing.module';
import { RatingPageComponent } from './rating.page';
import { RatingService } from './rating.service';
import { RatingWidgetComponent } from './widget/rating.component';

@NgModule({
  declarations: [
    RatingPageComponent,
    RatingWidgetComponent,
    MapComponent,
    ChartComponent,
    CitiesPipe,
    BarComponent,
    GridComponent,
    BallComponent,
    CityListComponent,
  ],
  imports: [
    CommonModule,
    RatingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    AngularYandexMapsModule,
    ScrollingModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonToggleModule,
    DashboardStoreModule,
    RightOutletModule
  ],
  exports: [RatingWidgetComponent],
  providers: [RatingService],
})
export class RatingModule {}
