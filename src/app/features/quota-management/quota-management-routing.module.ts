import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuotaManagementComponent } from './quota-management/quota-management.component';

const routes: Routes = [{ path: '', component: QuotaManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotaManagementRoutingModule {}
