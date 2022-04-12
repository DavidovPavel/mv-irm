export enum BlameServiceCenterType {
  'Нет значения',
  'Нет - не вина СЦ',
  'Да - вина СЦ',
}

export enum IncidentRequestStatusTrigger {
  Запрос_отменён,
  СЦ_завершил_исполнение_запроса,
  Запрос_отправлен_в_СЦ_на_доработку,
}

export enum IncidentUserRole {
  NoRole,
  ServiceCenter,
  ResponsibleEmployee
}

export enum IncidentRequestStatusType {
  'Created',
  'InWork',
  'DepartureAppointed',
  'Closed',
}

export enum IncidentRequestStatusTypeName {
  'Создан',
  'В работе',
  'Назначен выезд',
  'Закрыт',
}

export enum SaleChannel {
  'Магазин' = 1,
  'Интернет-магазин' = 2,
  'Ручная заявка' = 3,
  'Проверка качества' = 4,
}

export enum Brand {
  'Мвидео' = 2,
  'Эльдорадо' = 3,
}
