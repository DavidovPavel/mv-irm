import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRMPermissions } from '@app/models';
import { NgxPermissionsGuard } from 'ngx-permissions';

import { ExpirationHistoryComponent } from './incident-card/expirations/expiration-history/expiration-history.component';
import { HistoryPageComponent } from './incident-card/history/history-page/history-page.component';
import { IncidentCardComponent } from './incident-card/incident-card.component';
import { IncidentRequestComponent } from './incident-request/incident-request.component';
import { IncidentSearchComponent } from './incident-search/incident-search.component';

const routes: Routes = [
  { path: '', component: IncidentSearchComponent },
  { path: 'request', component: IncidentRequestComponent },
  { path: ':id', component: IncidentCardComponent },
  { path: ':id/expiration', component: ExpirationHistoryComponent },
  {
    path: ':id/history',
    component: HistoryPageComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: IRMPermissions.ViewIncidentHistory,
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentsRoutingModule {}
