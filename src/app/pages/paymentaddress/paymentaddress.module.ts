import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentaddressPageRoutingModule } from './paymentaddress-routing.module';

import { PaymentaddressPage } from './paymentaddress.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentaddressPageRoutingModule,
    ReactiveFormsModule 
  ],
  declarations: [PaymentaddressPage]
})
export class PaymentaddressPageModule {}
