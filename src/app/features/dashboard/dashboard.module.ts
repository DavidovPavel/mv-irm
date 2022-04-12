import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RightOutletModule } from '@app/shell/right-outlet/right-outlet.module';
import { NgxPermissionsModule } from 'ngx-permissions';

import { InstallationQueueModule } from '../installations-queue/installation-queue.module';
import { RatingModule } from './../rating/rating.module';
import { TileComponent } from './components/tile/tile.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.page/dashboard.page';
import { DashboardStoreModule } from './state';
import { AppealStatesClosedComponent } from './widgets/appeal-states-closed/appeal-states-closed.component';
import { DigitalAssistantOutsideComponent } from './widgets/digital-assistant-outside/digital-assistant-outside.component';
import { EquipmentInstallationComponent } from './widgets/equipment-installation/equipment-installation.component';
import { IncidentWidgetComponent } from './widgets/incident-widget/incident-widget.component';

@NgModule({
  declarations: [
    DashboardComponent,
    EquipmentInstallationComponent,
    DigitalAssistantOutsideComponent,
    IncidentWidgetComponent,
    TileComponent,
    AppealStatesClosedComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardStoreModule,
    FlexLayoutModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    NgxPermissionsModule.forChild(),
    RatingModule,
    RightOutletModule,
    InstallationQueueModule,
  ],
})
export class DashboardModule {}
