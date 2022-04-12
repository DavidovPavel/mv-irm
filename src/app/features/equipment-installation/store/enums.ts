export const enum AppealStatus {
  New,
  InWork,
  Finished,
  Refusal,
  Defect,
  ArchiveOfRefusal,
  ArchiveOfFinished,
  All,
}

export enum AppealStatusName {
  'Новые',
  'Приняты в работу',
  'Установка произведена',
  'Отказ от установки',
  'Брак техники',
  'Архив отказов за полгода',
  'Архив установок за полгода',
  'Все заявки',
}

export const enum ServiceStatus {
  Current = 0,
  Cancelled = 1,
  Expired = 2,
  NotPaid = 10,
  Deleted = 11,
}

export const enum PaymentStatus {
  Inactive,
  AddedToTheReport,
  ReportOnTheRevision,
  Paid,
  Empty,
}

export enum OperationType {
  'add' = 'add',
  'remove' = 'remove',
  'replace' = 'replace',
  'copy' = 'copy',
  'move' = 'move',
  'test' = 'test',
}
