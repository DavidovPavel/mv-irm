import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InstallationCardComponent } from './installation-card/installation-card.component';
import { InstallationRegisterComponent } from './installation-register/installation-register.component';


const routes: Routes = [
  { path: '', component: InstallationRegisterComponent },
  { path: ':id', component: InstallationCardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentInstallationRoutingModule {}
