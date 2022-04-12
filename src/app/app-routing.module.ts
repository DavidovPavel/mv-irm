import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'rating',
    loadChildren: () => import('./features/rating/rating.module').then((m) => m.RatingModule),
  },
  {
    path: 'equipment-installation',
    loadChildren: () =>
      import('./features/equipment-installation/equipment-installation.module').then(
        (m) => m.EquipmentInstallationModule
      ),
  },
  {
    path: 'installation-queue',
    loadChildren: () =>
      import('./features/installations-queue/installation-queue.module').then((m) => m.InstallationQueueModule),
  },
  {
    path: 'quotas-management',
    loadChildren: () =>
      import('./features/quota-management/quota-management.module').then((m) => m.QuotaManagementModule),
  },
  {
    path: 'service-companies',
    loadChildren: () =>
      import('./features/service-companies/service-companies.module').then((m) => m.ServiceCompaniesModule),
  },
  {
    path: 'incidents',
    loadChildren: () => import('./features/incidents/incidents.module').then((m) => m.IrmIncidentsModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
