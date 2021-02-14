import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { CategoryProductsTableComponent } from './components/category-products-table/category-products-table.component';
import { CategoryComponent } from './components/category/category.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { ItemComponent } from './components/item/item.component';
import { ItemsTableComponent } from './components/items-table/items-table.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';

const routes: Routes = [

  {path:'categories', component:CategoriesTableComponent},
  {path:'category/new', component:CategoryComponent},
  {path:'category/update/:id', component:CategoryComponent},
  {path:'categoryProducts/:categoryId', component:CategoryProductsTableComponent},

  {path:'products', component:ProductsTableComponent},
  {path:'product/new', component:ProductComponent},
  {path:'product/update/:id', component:ProductComponent},

  {path:'items', component:ItemsTableComponent},
  {path:'item/new', component:ItemComponent},
  {path:'item/update/:id', component:ItemComponent},

  {path:'dashBoard', component:DashBoardComponent},
  {path:'login', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
