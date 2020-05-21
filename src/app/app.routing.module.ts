import { ContagemComponent } from './components/contagem/contagem.component';
import { ItemComponent } from './components/item/item.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListInventarioComponent } from './components/list-inventario/list-inventario.component';
import { CadastroInventarioComponent } from './components/list-inventario/cadastro-inventario/cadastro-inventario.component';
import { ImportItemComponent } from './components/import-item/import-item.component';
import { ExecucaoComponent } from './components/execucao/execucao.component';
import { ListEmpresaComponent } from './components/list-empresa/list-empresa.component';
import { CadastroEmpresaComponent } from './components/list-empresa/cadastro-empresa/cadastro-empresa.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'list-inventario',
    component: ListInventarioComponent,
  },
  {
    path: 'cadastro-inventario/:id',
    component: CadastroInventarioComponent,
  },
  {
    path: 'cadastro-inventario',
    component: CadastroInventarioComponent,
  },
  {
    path: 'item',
    component: ItemComponent,
  },
  {
    path: 'contagem',
    component: ContagemComponent,
  },
  {
    path: 'execucao',
    component: ExecucaoComponent,
  },
  {
    path: 'import',
    component: ImportItemComponent,
  },
  {
    path: 'import/:id',
    component: ImportItemComponent,
  },
  {
    path: 'cadastro-empresa',
    component: CadastroEmpresaComponent,
  },
  {
    path: 'cadastro-empresa/:cnpj',
    component: CadastroEmpresaComponent,
  },
  {
    path: 'list-empresa',
    component: ListEmpresaComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
