import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RightOutletModule } from '@app/shell/right-outlet/right-outlet.module';
import { HotTableModule } from '@handsontable/angular';
import { ReactiveComponentModule } from '@ngrx/component';
import { NumericCellType, registerCellType } from 'handsontable/cellTypes';
import { NumericEditor } from 'handsontable/editors';
import { registerEditor } from 'handsontable/editors/registry';
import { enUS } from 'handsontable/i18n';
import { registerLanguageDictionary } from 'handsontable/i18n/registry';
import { Autofill, CopyPaste, registerPlugin, UndoRedo } from 'handsontable/plugins';
import { numericRenderer } from 'handsontable/renderers';
import { registerRenderer } from 'handsontable/renderers/registry';
import { numericValidator } from 'handsontable/validators';
import { registerValidator } from 'handsontable/validators/registry';

import { CalendarComponent } from './components/calendar/calendar.component';
import { DataGridComponent } from './components/data-grid/data-grid.component';
import { GridDirective } from './components/data-grid/grid.directive';
import { ParamSelectorsComponent } from './components/param-selectors/param-selectors.component';
import { SubToolsComponent } from './components/sub-tools/sub-tools.component';
import { QuotaManagementRoutingModule } from './quota-management-routing.module';
import { QuotaManagementComponent } from './quota-management/quota-management.component';
import { QuotasManagerApiService } from './store/quotas-api.service';
import { QuotasManagementStore } from './store/quotas-management.store';
import { ExportDateRangeComponent } from './components/export-date-range/export-date-range.component';

registerCellType(NumericCellType);
registerPlugin(Autofill);
registerPlugin(UndoRedo);
registerPlugin(CopyPaste);
registerValidator(numericValidator);
registerEditor(NumericEditor);
registerRenderer(numericRenderer);
registerLanguageDictionary(enUS);

@NgModule({
  declarations: [
    QuotaManagementComponent,
    CalendarComponent,
    SubToolsComponent,
    DataGridComponent,
    ParamSelectorsComponent,
    GridDirective,
    ExportDateRangeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveComponentModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    QuotaManagementRoutingModule,
    MatDatepickerModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule,
    RightOutletModule,
    HotTableModule
  ],
  providers: [QuotasManagementStore, QuotasManagerApiService],
})
export class QuotaManagementModule {}
