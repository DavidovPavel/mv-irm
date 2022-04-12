import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ServiceCompanyStore } from '../store/service-company.store';

@Component({
  selector: 'app-list',
  templateUrl: './list-service-companies.component.html',
  styleUrls: ['./list-service-companies.component.scss'],
  providers: [ServiceCompanyStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListServiceCompaniesComponent implements OnInit {
  @HostBinding('class') class = 'page-container';

  paginatedQuery = {
    pageIndex: 0,
    pageSize: 10,
  };

  gridConfig = {
    name: { header: 'Название', cssCell: 'primary' },
    users: 'Логины',
    sapId: 'ID контрагента в SAP',
    serviceLinksId: 'ID контрагента в ServiceLinks',
    sapName: 'Название контрагента в SAP',
    sapContractNumber: 'Номер договора в SAP',
    externalContractNumber: 'Внешний номер договора',
    contractDate: 'Дата договора',
    changeDate: 'Изменен',
    isDeleted: 'Удален',
  };

  dataSource$ = this.serviceStore.queryResult$;

  liveSearchControl = new FormControl('');

  constructor(private readonly store: Store, private readonly serviceStore: ServiceCompanyStore) {}

  ngOnInit(): void {
    this.serviceStore.fetchServiceCompanies(this.paginatedQuery);
  }

  pageEvent(e: { pageIndex: number; pageSize: number }): void {
    this.paginatedQuery = e;
    this.serviceStore.fetchServiceCompanies(this.paginatedQuery);
  }
}
