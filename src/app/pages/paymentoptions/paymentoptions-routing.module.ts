import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentoptionsPage } from './paymentoptions.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentoptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentoptionsPageRoutingModule {}
