import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications-dialog',
  templateUrl: './notifications-dialog.component.html',
  styleUrls: ['notifications-dialog.component.scss'],
})
export class NotificationsDialogComponent {
  items = [
    { status: 'normal', title: 'Новое уведомление по заявке #276', time: '2 сек. назад' },
    { status: 'danger', title: 'Новое уведомление по заявке #276', time: '2 сек. назад' },
    { status: 'good', title: 'Новое уведомление по заявке #276', time: '2 сек. назад' },
    { status: 'normal', title: 'Новое уведомление по заявке #276', time: '2 сек. назад' },
    { status: 'danger', title: 'Новое уведомление по заявке #276', time: '2 сек. назад' },
  ];
}
