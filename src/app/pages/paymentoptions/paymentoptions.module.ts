import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentoptionsPageRoutingModule } from './paymentoptions-routing.module';

import { PaymentoptionsPage } from './paymentoptions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentoptionsPageRoutingModule
  ],
  declarations: [PaymentoptionsPage]
})
export class PaymentoptionsPageModule {}
