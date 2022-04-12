import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { NotificationsDialogComponent } from './notifications/dialog/notifications-dialog.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RightOutletComponent } from './right-outlet.component';

@NgModule({
  declarations: [NotificationsDialogComponent, RightOutletComponent, NotificationsComponent],
  imports: [CommonModule, ScrollingModule, MatIconModule, FlexLayoutModule],
  exports: [RightOutletComponent],
})
export class RightOutletModule {}
