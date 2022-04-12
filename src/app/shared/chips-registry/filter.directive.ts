import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { BaseItem } from '@app/models';

import { ChipsManageService } from './chips-manage.service';

@Directive({
  selector: '[appFilter]',
})
export class FilterDirective {
  @Input() controlName!: string;
  @Input() label!: string;
  @Input() source!: BaseItem[] | null;

  @Output() changed = new EventEmitter();

  constructor(readonly cm: ChipsManageService) {}

  getLabel(value: string): string {
    return `${this.label}: ${value}`;
  }
}
