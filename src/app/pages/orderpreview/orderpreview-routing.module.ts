import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderpreviewPage } from './orderpreview.page';

const routes: Routes = [
  {
    path: '',
    component: OrderpreviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderpreviewPageRoutingModule {}
