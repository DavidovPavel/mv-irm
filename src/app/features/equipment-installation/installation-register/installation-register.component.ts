import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { PaginatedQuery } from '@app/models';
import { ChipsManageService } from '@app/shared/chips-registry/chips-manage.service';

import { dictionaryName, InstallationRegisterStore } from '../store/installation-registry.store';
import { tap, pluck, distinctUntilChanged } from 'rxjs/operators';
import { AppealStatusName } from '../store/enums';

@Component({
  selector: 'app-installation-register',
  templateUrl: './installation-register.component.html',
  styleUrls: ['./installation-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [InstallationRegisterStore, ChipsManageService],
})
export class InstallationRegisterComponent implements OnInit {
  @HostBinding('class') class = 'page-container';

  showAdvanced = false;
  paginatedQuery = {
    pageIndex: this.route.snapshot.params.pageIndex || 0,
    pageSize: this.route.snapshot.params.pageSize || 10,
  };

  params$ = this.route.params.pipe(
    pluck('status'),
    distinctUntilChanged(),
    tap((value) => {
      if (value) {
        this.chips.addChip('status', { label: `Статус: ${AppealStatusName[value]}`, value });
      } else {
        this.chips.removeChip('status');
      }
      this.store.patchState({ chipCount: this.chips.items.size });
      this.load();
    })
  );

  constructor(
    private readonly store: InstallationRegisterStore,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly chips: ChipsManageService
  ) {}

  ngOnInit(): void {
    this.store.initChips(this.paginatedQuery);
  }

  setPaginatedQuery(value: PaginatedQuery): void {
    this.paginatedQuery = value;
    this.router.navigate(['./', { ...this.route.snapshot.params, ...this.paginatedQuery }]);
  }

  removeChip(name: dictionaryName): void {
    this.store.loadOne({ name, data: null });
  }

  load(): void {
    this.store.search(this.paginatedQuery);
  }

  excel(): void {
    this.store.downloadToExcel(this.paginatedQuery);
  }

  complicatedSearch(value: string): void {
    this.store.findAppealsByText(value);
  }
}
