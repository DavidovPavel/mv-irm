import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QueryResult } from '@app/models';
import { GridConfig } from '@irm-ui/common';

import { Incident, IncidentRequestStatusTypeName } from '../../models';

@Component({
  selector: 'app-incident-result-grid',
  templateUrl: './result-grid.component.html',
  styleUrls: ['./result-grid.component.scss'],
})
export class ResultGridComponent {
  incidentRequestStatusTypeName = IncidentRequestStatusTypeName;

  gridConfig: GridConfig = {
    incidentNumber: { header: 'Инцидент', cssCell: 'primary' },
    numberZNU: 'Номер ЗНУ',
    clientName: 'ФИО клиента',
    clientPhone: 'Телефон клиента',
    incidentCreationReasonType: 'Причина создания',
    incidentRequestStatusType: 'Статус запроса',
    serviceCenterName: 'Сервисный центр',
    creationDate: 'Дата создания',
    closeDate: 'Дата закрытия',
  };

  @Input() data!: QueryResult<Incident>;
  @Input() paginatedQuery!: { pageIndex: number; pageSize: number };
  @Output() changePaginatedQuery = new EventEmitter<{ pageIndex: number; pageSize: number }>();

  get totalSize(): number {
    return this.data.totalSize;
  }

  get dataSource(): Incident[] {
    return this.data.data;
  }

  changePage(query: { pageIndex: number; pageSize: number }): void {
    this.changePaginatedQuery.emit(query);
  }
}
