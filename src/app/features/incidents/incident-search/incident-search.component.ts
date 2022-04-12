import { ChangeDetectionStrategy, Component, HostBinding, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IRMPermissions, ParamRequest } from '@app/models';

import { IncidentStore } from '../store/incident.store';
import { SearchService } from './search.service';

@Component({
  selector: 'app-incident-search',
  templateUrl: './incident-search.component.html',
  styleUrls: ['./incident-search.component.scss'],
  providers: [SearchService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidentSearchComponent implements OnInit {
  @HostBinding('class') class = 'page-container';

  superSearch = new FormControl();
  showExpanded = false;
  paginatedQuery = { pageIndex: 0, pageSize: 10 };

  result$ = this.store.listIncidents$;

  formChanges$ = this.service.formChanges();

  constructor(
    public service: SearchService,
    public readonly store: IncidentStore,
    @Inject(IRMPermissions) public permissions: typeof IRMPermissions
  ) {
    this.store.fetchPermissions();
  }

  get PaginationParam(): ParamRequest {
    return {
      'pagination.pageIndex': `${this.paginatedQuery.pageIndex}`,
      'pagination.pageSize': `${this.paginatedQuery.pageSize}`,
    };
  }

  ngOnInit(): void {
    this.service.fillForm();
    const pageIndex = this.service.form.get('page')?.value ?? 0;
    this.paginatedQuery.pageIndex = pageIndex;
    this.load();
  }

  setPaginatedQuery(value: { pageIndex: number; pageSize: number }): void {
    this.paginatedQuery = value;
    this.service.form.get('page')?.setValue(value.pageIndex);
    this.load();
  }

  load(): void {
    const pageIndex = this.service.form.get('page')?.value ?? 0;
    this.paginatedQuery.pageIndex = pageIndex;

    const data = this.service.clearEmpty<ParamRequest>(this.service.form.value, this.PaginationParam);
    this.store.fetchListIncidents(data);
  }

  excel(): void {
    const data = this.service.clearEmpty<ParamRequest>(this.service.form.value, this.PaginationParam);
    this.store.downloadToExcel(data);
  }

  complicatedSearch(): void {
    this.store.fetchListIncidentsByText(this.superSearch.value);
  }
}
