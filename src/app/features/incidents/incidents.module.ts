import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonStoreModule } from '@app/root-store/common/common-store.module';
import { RightOutletModule } from '@app/shell/right-outlet/right-outlet.module';
import { IrmCommonModule } from '@irm-ui/common';
import { ReactiveComponentModule } from '@ngrx/component';
import { NgxPermissionsModule } from 'ngx-permissions';

import { UploadFileDirective } from './directives/upload-file.directive';
import { CommentFileIconPipe } from './incident-card/comments/comment-file-icon.pipe';
import { CommentListComponent } from './incident-card/comments/comment-list/comment-list.component';
import { CommentsComponent } from './incident-card/comments/comments.component';
import { FileListComponent } from './incident-card/comments/file-list/file-list.component';
import { ControlsComponent } from './incident-card/controls/controls.component';
import { DialogCommentComponent } from './incident-card/controls/dialog-comment.component';
import { DepartureDateComponent } from './incident-card/departure-date-panel/departure-date.component';
import { ExpirationFormComponent } from './incident-card/expirations/expiration-form/expiration-form.component';
import { ExpirationHistoryComponent } from './incident-card/expirations/expiration-history/expiration-history.component';
import { FileUploadComponent } from './incident-card/file-upload/file-upload.component';
import { FormGroupDirective } from './incident-card/form-group.directive';
import { HistoryPageComponent } from './incident-card/history/history-page/history-page.component';
import { HistoryPanelComponent } from './incident-card/history/history-panel/history-panel.component';
import { ShapshotComponent } from './incident-card/history/shapshot/shapshot.component';
import { IncidentCardComponent } from './incident-card/incident-card.component';
import { IncidentSourceDirective } from './incident-card/incident-source.directive';
import { NumberZnuDirective } from './incident-card/request-panel/number-znu.directive';
import { RequestDataComponent } from './incident-card/request-panel/request-data.component';
import { RequestFilesComponent } from './incident-card/request-panel/request-files/request-files.component';
import { ServiceCentersDirective } from './incident-card/request-panel/service-centers.directive';
import { ZnuInfoPipe } from './incident-card/request-panel/znu-info.pipe';
import { TimingComponent } from './incident-card/timing-panel/timing.component';
import { ZnuDataComponent } from './incident-card/znu-panel/znu-data.component';
import { IncidentRequestComponent } from './incident-request/incident-request.component';
import { ChipsComponent } from './incident-search/chips/chips.component';
import { CheckUserAsShopDirective } from './incident-search/extended-filter/check-user-as-shop.directive';
import { IncidentExtendedFilterComponent } from './incident-search/extended-filter/extended-filter.component';
import { FilterAutocompleteComponent } from './incident-search/filter-autocomplete/filter-autocomplete.component';
import { FilterCheckboxComponent } from './incident-search/filter-checkbox/filter-checkbox.component';
import { FilterDatepickerComponent } from './incident-search/filter-datepicker/filter-datepicker.component';
import { FilterSelectComponent } from './incident-search/filter-select/filter-select.component';
import { FilterDirective } from './incident-search/filter.directive';
import { IncidentSearchComponent } from './incident-search/incident-search.component';
import { ResultGridComponent } from './incident-search/result-grid/result-grid.component';
import { ToolbarComponent } from './incident-search/toolbar/toolbar.component';
import { IncidentsRoutingModule } from './incidents-routing.module';
import { PermissionManagementService } from './permission-management.service';
import { IncidentApiService } from './store/incident-api.service';
import { IncidentCardStore } from './store/incident-card.store';
import { IncidentStore } from './store/incident.store';

@NgModule({
  declarations: [
    IncidentCardComponent,
    IncidentSearchComponent,
    IncidentExtendedFilterComponent,
    FilterAutocompleteComponent,
    RequestDataComponent,
    TimingComponent,
    ZnuDataComponent,
    ControlsComponent,
    ToolbarComponent,
    ResultGridComponent,
    CommentsComponent,
    CommentListComponent,
    FileListComponent,
    DepartureDateComponent,
    IncidentRequestComponent,
    UploadFileDirective,
    FileUploadComponent,
    DialogCommentComponent,
    CommentFileIconPipe,
    RequestFilesComponent,
    ChipsComponent,
    FilterDatepickerComponent,
    FilterSelectComponent,
    FilterDirective,
    CheckUserAsShopDirective,
    FormGroupDirective,
    IncidentSourceDirective,
    NumberZnuDirective,
    ZnuInfoPipe,
    ServiceCentersDirective,
    ExpirationHistoryComponent,
    FilterCheckboxComponent,
    ExpirationFormComponent,
    HistoryPanelComponent,
    HistoryPageComponent,
    ShapshotComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    IncidentsRoutingModule,
    IrmCommonModule,
    CommonStoreModule,
    ReactiveComponentModule,
    NgxPermissionsModule.forChild({ permissionsIsolate: true, rolesIsolate: true }),
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatDialogModule,
    MatTabsModule,
    ScrollingModule,
    CdkAccordionModule,
    RightOutletModule,
  ],
  providers: [IncidentStore, IncidentCardStore, IncidentApiService, PermissionManagementService],
  entryComponents: [DialogCommentComponent],
})
export class IrmIncidentsModule {}
