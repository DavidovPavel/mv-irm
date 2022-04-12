import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { RequestParams } from '../../models';
import { Period } from '../../quota-management/quota-management.component';
import { QuotasManagementStore } from '../../store/quotas-management.store';

@Component({
  selector: 'app-quota-management-sub-tools',
  templateUrl: './sub-tools.component.html',
  styleUrls: ['./sub-tools.component.scss'],
})
export class SubToolsComponent implements OnInit {
  preset!: RequestParams | null;

  serviceCenters$ = this.store.serviceCenters$;

  @Input() disabled = true;
  @Input() sapId!: string;

  @Output() copyEvent = new EventEmitter<7 | 30>();
  @Output() clear = new EventEmitter();

  constructor(private store: QuotasManagementStore) {}

  ngOnInit(): void {
    this.preset = this.store.getSettings(this.sapId);
    this.store.fetchServiceCenters();
  }

  copyEmit(period: Period): void {
    this.copyEvent.emit(period);
  }

  clearEmit(): void {
    this.clear.emit();
  }
}
