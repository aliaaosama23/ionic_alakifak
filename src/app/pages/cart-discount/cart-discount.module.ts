import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartDiscountPageRoutingModule } from './cart-discount-routing.module';

import { CartDiscountPage } from './cart-discount.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartDiscountPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CartDiscountPage]
})
export class CartDiscountPageModule {}
