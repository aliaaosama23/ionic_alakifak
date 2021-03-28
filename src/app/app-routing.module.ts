import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataResolverService } from './services/DataResolver/data-resolver.service';

const routes: Routes = [
 // { path: '', redirectTo: '/tabs', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('../app/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./pages/forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },

  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'all-categories',
    loadChildren: () => import('./pages/all-categories/all-categories.module').then( m => m.AllCategoriesPageModule)
  },
  {
    path: 'product/:id',
    resolve: {
      data: DataResolverService
    },
    loadChildren: () => import('./pages/product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'password-change',
    loadChildren: () => import('./pages/password-change/password-change.module').then( m => m.PasswordChangePageModule)
  },
  {
    path: 'favourite',
    loadChildren: () => import('./pages/favourite/favourite.module').then( m => m.FavouritePageModule)
  },
  {
    path: 'contactus',
    loadChildren: () => import('./pages/contactus/contactus.module').then( m => m.ContactusPageModule)
  },
  {
    path: 'my-orders',
    loadChildren: () => import('./pages/my-orders/my-orders.module').then( m => m.MyOrdersPageModule)
  },
  {
    path: 'cart-discount/:total',
    loadChildren: () => import('./pages/cart-discount/cart-discount.module').then( m => m.CartDiscountPageModule)
  },
  {
    path: 'paymentoptions',
    loadChildren: () => import('./pages/paymentoptions/paymentoptions.module').then( m => m.PaymentoptionsPageModule)
  },
  {
    path: 'paymentoptions-details/:option',
    loadChildren: () => import('./pages/paymentoptions-details/paymentoptions-details.module').then( m => m.PaymentoptionsDetailsPageModule)
  },
  {
    path: 'checkout-complete',
    loadChildren: () => import('./pages/checkout-complete/checkout-complete.module').then( m => m.CheckoutCompletePageModule)
  },
  {
    path: 'category-products/:id',
    resolve: {
      data: DataResolverService
    },  
    loadChildren: () => import('./pages/category-products/category-products.module').then( m => m.CategoryProductsPageModule)
  },
  {
    path: 'aboutus/:id',
    loadChildren: () => import('./pages/aboutus/aboutus.module').then( m => m.AboutusPageModule)
  },
  {
    path: 'shippingoptions', 
    loadChildren: () => import('./pages/shippingoptions/shippingoptions.module').then( m => m.ShippingoptionsPageModule)
  },
  {
    path: 'paymentaddress',
    loadChildren: () => import('./pages/paymentaddress/paymentaddress.module').then( m => m.PaymentaddressPageModule)
  },
  {
    path: 'orderpreview',
    loadChildren: () => import('./pages/orderpreview/orderpreview.module').then( m => m.OrderpreviewPageModule)
  },
  {
    path: 'my-order-details/:id',
    loadChildren: () => import('./pages/my-order-details/my-order-details.module').then( m => m.MyOrderDetailsPageModule)
  },




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
