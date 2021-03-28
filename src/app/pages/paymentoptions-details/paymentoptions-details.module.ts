import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentoptionsDetailsPageRoutingModule } from './paymentoptions-details-routing.module';

import { PaymentoptionsDetailsPage } from './paymentoptions-details.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentoptionsDetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PaymentoptionsDetailsPage]
})
export class PaymentoptionsDetailsPageModule {}
