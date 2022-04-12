import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InstallationQueueComponent } from './installation-queue.page';

const routes: Routes = [{ path: '', component: InstallationQueueComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstallQueueRoutingModule {}
