import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutCompletePage } from './checkout-complete.page';

const routes: Routes = [
  {
    path: '',
    component: CheckoutCompletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutCompletePageRoutingModule {}
