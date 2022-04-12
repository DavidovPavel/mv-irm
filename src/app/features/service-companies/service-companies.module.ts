import { RightOutletModule } from './../../shell/right-outlet/right-outlet.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { IrmCommonModule } from '@irm-ui/common';
import { ReactiveComponentModule } from '@ngrx/component';

import { CrossDocsComponent } from './cross-docs/cross-docs.component';
import { HolderComponent } from './holder/holder.component';
import { ArrayToColumnPipe } from './list-service-companies/array-to-column.pipe';
import { ListServiceCompaniesComponent } from './list-service-companies/list-service-companies.component';
import { ManagersComponent } from './managers/managers.component';
import { ServiceCompaniesRoutingModule } from './service-companies-routing.module';
import { ServiceCompanyService } from './store/service-company.service';

@NgModule({
  declarations: [
    ListServiceCompaniesComponent,
    HolderComponent,
    CrossDocsComponent,
    ManagersComponent,
    ArrayToColumnPipe,
  ],
  imports: [
    CommonModule,
    IrmCommonModule,
    ServiceCompaniesRoutingModule,
    ReactiveComponentModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatTabsModule,
    MatToolbarModule,
    RightOutletModule
  ],
  providers: [ServiceCompanyService],
})
export class ServiceCompaniesModule {}
