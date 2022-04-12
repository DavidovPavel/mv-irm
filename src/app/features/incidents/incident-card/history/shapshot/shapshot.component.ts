import { NumberItem } from '@app/models';
import { Component, Input } from '@angular/core';
import { DictionaryName, dictionaryName } from '@app/features/incidents/store/incident-api.service';

import { HistoryField, IncidentHistory } from './../../../models/incident-history';

enum FieldName {
  ClientName = 'ФИО клиента',
  ClientPhone = 'Телефон клиента',
  ServiceCenterId = 'Сервисный центр',
  BlameServiceCenterType = 'Вина СЦ',
  IncidentCreationReasonId = 'Причина создания',
  ResponsibleEmployeeMail = 'Почта отв. сотрудника',
  ProblemEssence = 'Суть проблемы/обращения',
  ExpectedSolution = 'Ожидаемое решение',
  CreationDate = 'Дата создания',
  ActualReactionDate = 'Фактическая дата реагирования',
  DepartureDate = 'Дата выезда',
  CloseDate = 'Дата закрытия',
  ReopenDate = 'Дата переоткрытия',
  ServiceName = 'Наименование услуги',
  InternetOrderNumber = 'Номер интернет заказа',
  TsOrderNumber = 'Номер заказа TS',
  ShopId = 'Магазин №',
}

@Component({
  selector: 'app-shapshot',
  templateUrl: './shapshot.component.html',
  styleUrls: ['./shapshot.component.scss'],
})
export class ShapshotComponent {
  @Input() content!: IncidentHistory | null;

  getName(name: keyof typeof FieldName): string {
    return FieldName[name];
  }

  getNameFromDictionary(name: string, value?: string | number): string {
    const output = value ? `${value}` : '';
    const data = this.getDataFromDictionary(name);
    if (Array.isArray(data)) {
      return data.find((a) => a.id === value)?.name || output;
    } else {
      return output;
    }
  }

  getValue(field: HistoryField[], key: string): string {
    const f = field.find((a) => a.Name === key);
    if (f) {
      return this.getNameFromDictionary(f.Name, f.CurrentValue);
    } else {
      return key;
    }
  }

  getDataFromDictionary(name: string): NumberItem[] | string | number | boolean | null {
    const [first, ...other] = name.split('');
    const key = [first.toLocaleLowerCase(), ...other].join('') as dictionaryName;
    return DictionaryName[key];
  }
}
