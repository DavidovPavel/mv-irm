import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { CommonStateActions } from '@app/root-store/common';
import { MenuItem } from '@app/root-store/common/models/menu-item.interface';
import { Store } from '@ngrx/store';

@Directive({
  selector: '[appSubMenu]',
})
export class SubMenuDirective {
  @Input()
  appSubMenu!: MenuItem;

  constructor(private el: ElementRef, private readonly store: Store) {}

  @HostListener('mouseenter') mouseenter(): void {
    if (this.appSubMenu.children?.length) {
      const el = this.el.nativeElement;
      const parent = el.parentElement.parentElement.parentElement;
      const left = +parent.offsetWidth + 1;
      const top = +el.offsetTop + parent.offsetTop - parent.scrollTop;
      const leftSubMenuItems = { items: this.appSubMenu.children, position: { left, top } };
      this.store.dispatch(CommonStateActions.showSubMenu({ leftSubMenuItems }));
    } else {
      this.store.dispatch(CommonStateActions.hideSubMenu());
    }
  }

  @HostListener('mouseleave') mouseleave(): void {
    this.store.dispatch(CommonStateActions.hideSubMenu());
  }

  @HostListener('click') click(): void {
    this.store.dispatch(CommonStateActions.hideSubMenu());
  }
}
