import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatedQuery } from '@app/models';
import { GridConfig } from '@irm-ui/common';

import { Dictionary } from './../../store/equipment-installation.service';
import { InstallationRegisterStore } from './../../store/installation-registry.store';

@Component({
  selector: 'app-installation-grid',
  templateUrl: './installation-grid.component.html',
})
export class InstallationGridComponent {
  dataSource$ = this.store.list$;

  gridConfig: GridConfig = {
    title: 'Наименование',
    serviceName: 'Наименование услуги',
    bsiStatus: 'Статус',
    serviceStatus: 'Состояние',
    serviceCenterName: 'Сервисный центр',
    orderNumber: 'Номер заказа СК',
    saleDate: 'Дата продажи',
    serviceDesiredDate: 'Желаемая дата установки',
    serviceDate: 'Дата установки',
    mobilePhone: 'Мобильный телефон',
  };

  @Input() paginatedQuery!: PaginatedQuery;
  @Output() changePaginatedQuery = new EventEmitter<PaginatedQuery>();

  constructor(private readonly store: InstallationRegisterStore) {}

  changePage(query: PaginatedQuery): void {
    this.changePaginatedQuery.emit(query);
  }

  find(id: number, key: string): string | undefined {
    return Dictionary[key].find((a) => a.id === id)?.name;
  }
}
