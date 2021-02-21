import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { ItemComponent } from './components/item/item.component';
import { ItemsTableComponent } from './components/items-table/items-table.component';
import { ProductItemsTableComponent } from './components/product-items-table/product-items-table.component';
import { CategoryProductsTableComponent } from './components/category-products-table/category-products-table.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {OwlModule}from 'ngx-owl-carousel';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SliderComponent } from './components/slider/slider.component';
@NgModule({
  declarations: [
    AppComponent,
    CategoriesTableComponent,
    DashBoardComponent,
    LoginComponent,
    ProductsTableComponent,
    CategoryComponent,
    ProductComponent,
    ItemComponent,
    ItemsTableComponent,
    ProductItemsTableComponent,
    CategoryProductsTableComponent,
    HomeComponent,
    NavBarComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    OwlModule,
    RouterModule,
    CarouselModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
