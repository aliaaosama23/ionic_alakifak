import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShippingoptionsPageRoutingModule } from './shippingoptions-routing.module';

import { ShippingoptionsPage } from './shippingoptions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShippingoptionsPageRoutingModule
  ],
  declarations: [ShippingoptionsPage]
})
export class ShippingoptionsPageModule {}
