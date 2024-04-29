import { Routes } from '@angular/router';
import { ViewProdutosComponent } from './view-produtos/view-produtos.component';
import { EditProdutosComponent } from './edit-produtos/edit-produtos.component';

export const routes: Routes = [
    {path: '', redirectTo: "/produto", pathMatch: "full"},
    {path: 'produto', component: ViewProdutosComponent},
    {path: 'produto/cadastro', component: EditProdutosComponent},
    {path: 'produto/cadastro/:id', component: EditProdutosComponent}
];
