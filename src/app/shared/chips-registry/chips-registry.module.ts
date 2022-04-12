import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveComponentModule } from '@ngrx/component';

import { ChipsManageService } from './chips-manage.service';
import { ChipsComponent } from './chips/chips.component';
import { FilterAutocompleteComponent } from './filter-autocomplete/filter-autocomplete.component';
import { FilterDatepickerComponent } from './filter-datepicker/filter-datepicker.component';
import { FilterSelectComponent } from './filter-select/filter-select.component';
import { FilterDirective } from './filter.directive';

@NgModule({
  declarations: [
    ChipsComponent,
    FilterDirective,
    FilterSelectComponent,
    FilterAutocompleteComponent,
    FilterDatepickerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveComponentModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  exports: [
    ChipsComponent,
    FilterDirective,
    FilterSelectComponent,
    FilterAutocompleteComponent,
    FilterDatepickerComponent,
  ],
})
export class ChipsRegistryModule {}
