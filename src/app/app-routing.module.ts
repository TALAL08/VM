import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { CategoryProductsTableComponent } from './components/category-products-table/category-products-table.component';
import { CategoryComponent } from './components/category/category.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'categories', component:CategoriesTableComponent},
  {path:'category/new', component:CategoryComponent},
  {path:'category/update/:id', component:CategoryComponent},
  {path:'categoryProducts/:categoryId', component:CategoryProductsTableComponent},
  {path:'dashBoard', component:DashBoardComponent},
  {path:'login', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
