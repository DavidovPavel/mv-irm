import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { BaseItem } from '@app/models';
import { Observable } from 'rxjs';

import { dictionaryName } from '../store/incident-api.service';
import { IncidentStore } from '../store/incident.store';
import { SearchService } from './search.service';

@Directive({
  selector: '[appFilter]'
})
export class FilterDirective {

  @Input() label!: string;
  @Input() controlName!: dictionaryName;
  @Input() source!: Observable<BaseItem[]>;

  @Output() changed = new EventEmitter();

  constructor(protected readonly store: IncidentStore, public collector: SearchService) { }

  getLabel(name: string): string {
    return `${this.label}: ${name}`;
  }

}
