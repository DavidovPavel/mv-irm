import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';

import { MenuItemComponent } from './menu-item/menu-item.component';
import { SidebarComponent } from './sidebar.component';
import { SubMenuDirective } from './sub-menu.directive';
import { SubMenuComponent } from './sub-menu/sub-menu.component';

export const Material = [];
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    ScrollingModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatTooltipModule,
    NgxPermissionsModule.forChild(),
  ],
  declarations: [SidebarComponent, MenuItemComponent, SubMenuComponent, SubMenuDirective],
  exports: [SubMenuComponent, SidebarComponent],
})
export class SadebarModule {}
