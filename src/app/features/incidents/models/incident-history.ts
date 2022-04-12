export interface IncidentHistory {
  eventType: number;
  aggregateId: number;
  historyEventDate: string;
  user: string;
  historyEventMetadata: string[];
  historyEventNames: historyEventName[];
  snapshotId?: number;
  actionId?: number;
  metaData: HistoryMetaData[];
  userMetadata: string;
  userData: { Roles: number[] };
}

export enum HistoryEvent {
  IncidentRequestCreateEvent = 'создал запрос',
  IncidentRequestChangeEvent = 'изменил запрос',
  IncidentRequestAddCommentsEvent = 'добавил комментарий',
  IncidentRequestAddFilesEvent = 'добавил файл',
  IncidentRequestDeleteFilesEvent = 'удалил файл',
  IncidentRequestAddFirstCommentEvent = 'изменил статус на "В работе"',
  IncidentRequestAddDepartureDateEvent = 'изменил статус на "Назначен выезд"',
  IncidentRequestCloseEvent = 'изменил статус на "Закрыт"',
  IncidentRequestReopenEvent = 'переоткрыл запрос',
  IncidentRequestCancelEvent = 'отменил запрос',
  IncidentRequestSendEmailAction = 'отправил уведомление',
}

export type historyEventName = keyof typeof HistoryEvent;

export interface HistoryField {
  Name: string;
  CurrentValue: string | number;
  OriginalValue?: string | number;
}

export interface HistoryMetaData {
  Subject?: string;
  Addresses?: string;
  Body?: string;
  Comments?: string[];
  Files?: { FileName: string; IncidentRequestFileType: 0 | 1; FileStoreId: number }[];
  ChangedFields: HistoryField[];
  CreatedFields: HistoryField[];
}

export interface HistoryDetails {
  aggregateId: number;
  previousSnapshot: {
    snapshot: { [key: string]: string | number | any[] };
  };
  currentSnapshot: {
    snapshot: { [key: string]: string | number | any[] };
  };
}
