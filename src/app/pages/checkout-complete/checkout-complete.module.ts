import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutCompletePageRoutingModule } from './checkout-complete-routing.module';

import { CheckoutCompletePage } from './checkout-complete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutCompletePageRoutingModule
  ],
  declarations: [CheckoutCompletePage]
})
export class CheckoutCompletePageModule {}
