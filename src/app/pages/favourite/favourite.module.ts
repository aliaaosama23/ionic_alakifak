import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavouritePageRoutingModule } from './favourite-routing.module';

import { FavouritePage } from './favourite.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavouritePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FavouritePage]
})
export class FavouritePageModule {}
