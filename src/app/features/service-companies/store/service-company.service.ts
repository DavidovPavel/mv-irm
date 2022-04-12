import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryResult, ServiceCompany } from '@app/models';
import { ApiService } from '@irm-ui/common';
import { Observable } from 'rxjs';

@Injectable()
export class ServiceCompanyService {
  constructor(private api: ApiService) {}

  getAppealsExpiredState(): Observable<{ parcent: string }> {
    return this.api.get('Main/api/ServiceCompanies/Appeals/states/expired');
  }

  getMasterRatings(): Observable<{ avg: string }> {
    return this.api.get('Main/api/Masters/ratings');
  }

  search(params: { [key: string]: string | number }): Observable<QueryResult<ServiceCompany>> {
    const fromObject = Object.keys(params).reduce((p, c: string) => ({ ...p, [c]: params[c].toString() }), {});
    return this.api.get<QueryResult<ServiceCompany>>(
      'Main/api/ServiceCompanies/search',
      new HttpParams({ fromObject })
    );
  }
}
