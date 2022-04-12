import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RatingPageComponent } from './rating.page';

const routes: Routes = [{ path: '', component: RatingPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RatingRoutingModule {}
