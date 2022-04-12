import { Injectable } from '@angular/core';
import { QueryResult, ServiceCompany } from '@app/models';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ServiceCompanyService } from './service-company.service';

export interface ServiceCompanyState {
  queryResult: QueryResult<ServiceCompany>;
}

@Injectable()
export class ServiceCompanyStore extends ComponentStore<ServiceCompanyState> {
  constructor(private readonly api: ServiceCompanyService) {
    super({
      queryResult: {
        data: [],
        totalSize: 0,
        paginatedQuery: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
    });
  }

  /**
   * selectors
   */
  readonly queryResult$ = this.select((state) => state.queryResult);

  /**
   * updaters
   */
  readonly addQueryResult = this.updater((state, queryResult: QueryResult<ServiceCompany>) => ({
    ...state,
    queryResult,
  }));

  /**
   * effects
   */
  readonly fetchServiceCompanies = this.effect((load$: Observable<{ [key: string]: string | number }>) =>
    load$.pipe(
      switchMap((params) =>
        this.api.search(params).pipe(
          tapResponse(
            (result) => this.addQueryResult(result),
            (error) => EMPTY
          )
        )
      )
    )
  );
}
