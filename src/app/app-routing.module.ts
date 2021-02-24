
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from './components/products/products.component'
import {HomeComponent} from './components/home/home.component'

const routes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'products', component: ProductsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
