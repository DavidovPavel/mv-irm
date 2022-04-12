import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IrmCommonModule } from '@irm-ui/common';
import { ReactiveComponentModule } from '@ngrx/component';

import { ChipsRegistryModule } from './../../shared/chips-registry/chips-registry.module';
import { RightOutletModule } from './../../shell/right-outlet/right-outlet.module';
import { EquipmentInstallationRoutingModule } from './equipment-installation-routing.module';
import { AddressPipe } from './installation-card/client-panel/address.pipe';
import { ClientPanelComponent } from './installation-card/client-panel/client-panel.component';
import { InstallationCardComponent } from './installation-card/installation-card.component';
import { ParentFormComponent } from './installation-card/parent-panel/parent-form.component';
import { SalesPanelComponent } from './installation-card/sales-data-panel/sales-panel.component';
import { ServiceCompanyPanelComponent } from './installation-card/service-company-panel/service-panel.component';
import { AdvancedFilterComponent } from './installation-register/advanced-filter/advanced-filter.component';
import { InstallationGridComponent } from './installation-register/installation-grid/installation-grid.component';
import { InstallationRegisterComponent } from './installation-register/installation-register.component';
import { RegistryToolbarComponent } from './installation-register/registry-toolbar/registry-toolbar.component';
import { EquipmentInstallationService } from './store/equipment-installation.service';

@NgModule({
  declarations: [
    InstallationCardComponent,
    ServiceCompanyPanelComponent,
    ClientPanelComponent,
    SalesPanelComponent,
    ParentFormComponent,
    AddressPipe,
    InstallationRegisterComponent,
    InstallationGridComponent,
    AdvancedFilterComponent,
    RegistryToolbarComponent,
  ],
  imports: [
    CommonModule,
    EquipmentInstallationRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    IrmCommonModule,
    ChipsRegistryModule,
    ReactiveComponentModule,
    RightOutletModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatSelectModule,
    MatBadgeModule,
  ],
  providers: [EquipmentInstallationService],
})
export class EquipmentInstallationModule {}
