import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { CategoryProductsTableComponent } from './components/category-products-table/category-products-table.component';
import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { CategoryComponent } from './components/category/category.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { HomeComponent } from './components/home/home.component';
import { ItemComponent } from './components/item/item.component';
import { ItemsTableComponent } from './components/items-table/items-table.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductItemsComponent } from './components/product-items/product-items.component';
import { ItemImagesComponent } from './components/item-images/item-images.component';
import { CartComponent } from './components/cart/cart.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { OrderComponent } from './components/order/order.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminOrderItemComponent } from './components/admin-order-item/admin-order-item.component';
import { SliderImageListComponent } from './components/slider-image-list/slider-image-list.component';
import { SliderImageFormComponent } from './components/slider-image-form/slider-image-form.component';

const routes: Routes = [

  {path:'cart', component:CartComponent},

  {path:'categories', component:CategoriesTableComponent},
  {path:'category/new', component:CategoryComponent},
  {path:'category/update/:id', component:CategoryComponent},
  {path:'categoryProductsTable/:categoryId', component:CategoryProductsTableComponent},
  {path:'categoryProducts/:categoryId', component:CategoryProductsComponent},
  {path:'orders', component:OrderComponent},
  {path:'orderItem/:orderId', component:OrderItemComponent},
  {path:'adminOrders', component:AdminOrdersComponent},
  {path:'adminOrderItem/:orderId', component:AdminOrderItemComponent},

  {path:'profile', component:ProfileComponent},
  {path:'products', component:ProductsTableComponent},
  {path:'product/new', component:ProductComponent},
  {path:'product/update/:id', component:ProductComponent},
  {path:'productItems/:productId', component:ProductItemsComponent},

  {path:'items', component:ItemsTableComponent},
  {path:'item/new', component:ItemComponent},
  {path:'item/update/:id', component:ItemComponent},
  {path:'item/:id', component:ItemDetailComponent},
  {path:'itemImages/:itemId', component:ItemImagesComponent},

  {path:'sliderImages', component:SliderImageListComponent},
  {path:'sliderImage/new', component:SliderImageFormComponent},
  {path:'sliderImage/update/:id', component:SliderImageFormComponent},

  {path:'dashBoard', component:DashBoardComponent},
  {path:'signUp', component:SignUpComponent},
  {path:'login', component:LoginComponent},
  {path:'customerLogin', component:CustomerLoginComponent},
  {path:'customerDetail', component:CustomerDetailComponent},

  {path:'home', component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
