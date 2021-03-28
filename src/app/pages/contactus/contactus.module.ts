import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactusPageRoutingModule } from './contactus-routing.module';

import { ContactusPage } from './contactus.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactusPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ContactusPage]
})
export class ContactusPageModule {}
