export enum ReservationObjectQueueStatus {
  New,
  InWork,
  Error,
  Outdated,
}

export enum CommunicationMethod {
  No = 0,
  Sms = 1,
  Sms2 = 2,
}

export enum Sex {
  Male = 0,
  Female = 1,
}

/** Тип заявки */
export enum BaseServiceCardType {
  Installation,
  DigitalAssistant,
  ShopDigitalAssistant,
  Recycling,
}

// export class EnumListModel {
//   public static readonly ServiceStatus: SelectItemViewModel[] = [
//     {
//       Id: ServiceStatus.Current,
//       Name: 'Действующая',
//     },
//     {
//       Id: ServiceStatus.Cancelled,
//       Name: 'Аннулированная',
//     },
//     {
//       Id: ServiceStatus.Expired,
//       Name: 'Срок действия истек',
//     },
//     {
//       Id: ServiceStatus.NotPaid,
//       Name: 'Не оплачена',
//     },
//   ];

//   public static readonly PaymentStatus: SelectItemViewModel[] = [
//     { Id: PaymentStatus.Inactive, Name: 'Не выставлена' },
//     { Id: PaymentStatus.AddedToTheReport, Name: 'Добавлена в отчет' },
//     { Id: PaymentStatus.ReportOnTheRevision, Name: 'Отчет на доработке' },
//     { Id: PaymentStatus.Paid, Name: 'Оплата' },
//     { Id: PaymentStatus.Empty, Name: 'Не выставлен' },
//   ];

//   public static readonly BaseServiceCardType: SelectItemViewModel[] = [
//     { Id: BaseServiceCardType.Installation, Name: 'Заявка на установку' },
//     { Id: BaseServiceCardType.DigitalAssistant, Name: 'Заявка ЦП на выезде' },
//     { Id: BaseServiceCardType.ShopDigitalAssistant, Name: 'Заявка ЦП в магазинее' },
//     { Id: BaseServiceCardType.Recycling, Name: 'Заявка на утилизацию' },
//   ];
// }
