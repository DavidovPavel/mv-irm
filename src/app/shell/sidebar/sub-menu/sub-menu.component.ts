import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { nonNullable } from '@app/core/func/pure';
import { CommonStateSelectors } from '@app/root-store/common';
import { SubMenuItems } from '@app/root-store/common/models/sub-menu-items.interface';
import { Store } from '@ngrx/store';
import { delay, map, pluck, tap } from 'rxjs/operators';

@Component({
  selector: 'app-sub-menu',
  template: `
    <ng-container *ngFor="let item of items$ | async">
      <ng-container *ngxPermissionsOnly="item.permission || ''">
        <a [href]="item.url" *ngIf="item.url.includes('#'); else simply">{{ item.name }}</a>
        <ng-template #simply>
          <a [routerLink]="item.url">{{ item.name }}</a>
        </ng-template>
      </ng-container>
    </ng-container>
  `,
  styleUrls: ['./sub-menu.component.scss'],
})
export class SubMenuComponent {
  private isOver = false;
  private data: SubMenuItems = { items: null };

  items$ = this.store.select(CommonStateSelectors.selectSubMenuItems).pipe(
    nonNullable<SubMenuItems>(),
    tap((b) => this.determineVisibility(b)),
    delay(100),
    map((a) => (this.isOver ? this.data : a)),
    pluck('items')
  );

  constructor(private readonly store: Store, private el: ElementRef, private render: Renderer2) {}

  @HostListener('mouseover') mouseover(): void {
    this.isOver = true;
  }

  @HostListener('mouseleave') mouseleave(): void {
    this.hideSubMenu();
  }

  determineVisibility(a: SubMenuItems): void {
    this.isOver = false;
    if (a.items?.length && a.position) {
      this.data = a;
      const el = this.el.nativeElement;
      this.render.setStyle(el, 'left', `${a.position.left}px`);
      this.render.setStyle(el, 'top', `${a.position.top}px`);
      this.render.setStyle(el, 'opacity', 1);
    }
  }

  hideSubMenu(): void {
    this.data = { items: null };
    const el = this.el.nativeElement;
    this.render.setStyle(el, 'left', '-300px');
    this.render.setStyle(el, 'opacity', 1);
  }
}
