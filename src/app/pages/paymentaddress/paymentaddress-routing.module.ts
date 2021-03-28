import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentaddressPage } from './paymentaddress.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentaddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentaddressPageRoutingModule {}
