import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IrmCommonModule } from '@irm-ui/common';
import { ReactiveComponentModule } from '@ngrx/component';

import { CommonStoreModule } from './../../root-store/common/common-store.module';
import { RightOutletModule } from './../../shell/right-outlet/right-outlet.module';
import { DetailsComponent } from './details/details.component';
import { LimitsByDayComponent } from './details/limits-by-day/limits-by-day.component';
import { LimitsComponent } from './details/limits/limits.component';
import { RegionsComponent } from './details/regions/regions.component';
import { InstallationQueueComponent } from './installation-queue.page';
import { InstallQueueRoutingModule } from './installations-queue-routing.module';
import { LeftAreaComponent } from './left-area/left-area.component';
import { ListComponent } from './left-area/list/list.component';
import { UserQuotasComponent } from './left-area/user-quotas/user-quotas.component';
import { InstallationQueueStore } from './store/installation-queue.store';
import { CheckQuotasComponent } from './widgets/check-quotas/check-quotas.component';
import { InstallationQueueServicesComponent } from './widgets/installation-queue-services/installation-queue-services.component';
import { CheckRegionQuotaPipe } from './details/check-region-quota.pipe';
import { IntervalByDayPipe } from './details/regions/interval-by-day.pipe';
import { HeaderGroupComponent } from './details/header-group/header-group.component';
import { GroupComponent } from './details/group/group.component';

@NgModule({
  declarations: [
    InstallationQueueComponent,
    ListComponent,
    DetailsComponent,
    LimitsComponent,
    RegionsComponent,
    UserQuotasComponent,
    CheckQuotasComponent,
    InstallationQueueServicesComponent,
    LimitsByDayComponent,
    LeftAreaComponent,
    CheckRegionQuotaPipe,
    IntervalByDayPipe,
    HeaderGroupComponent,
    GroupComponent,
  ],
  imports: [
    CommonModule,
    InstallQueueRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
    IrmCommonModule,
    CommonStoreModule,
    RightOutletModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    ScrollingModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCardModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  providers: [InstallationQueueStore],
  exports: [InstallationQueueServicesComponent, CheckQuotasComponent],
})
export class InstallationQueueModule {}
