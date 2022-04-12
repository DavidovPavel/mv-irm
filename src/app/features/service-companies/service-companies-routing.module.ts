import { ManagersComponent } from './managers/managers.component';
import { CrossDocsComponent } from './cross-docs/cross-docs.component';
import { HolderComponent } from './holder/holder.component';
import { ListServiceCompaniesComponent } from './list-service-companies/list-service-companies.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HolderComponent,
    children: [
      { path: '', redirectTo: 'list' },
      { path: 'list', component: ListServiceCompaniesComponent, data: { title: 'Сервисные компании' } },
      { path: 'cross-docs', component: CrossDocsComponent, data: { title: 'Кросс доки' } },
      { path: 'managers', component: ManagersComponent, data: { title: 'Менеджеры ЦО' } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceCompaniesRoutingModule {}
