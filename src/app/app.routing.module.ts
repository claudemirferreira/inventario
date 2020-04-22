import { LancamentoComponent } from './components/lancamento/lancamento.component';
import { ContagemComponent } from './components/contagem/contagem.component';
import { ItemComponent } from './components/item/item.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListInventarioComponent } from './components/list-inventario/list-inventario.component';
import { CadastroInventarioComponent } from './components/list-inventario/cadastro-inventario/cadastro-inventario.component';
import { ImportItemComponent } from './components/import-item/import-item.component';
import { ExecucaoComponent } from './components/execucao/execucao.component';

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
    path: 'lancamento',
    component: LancamentoComponent,
  },
  {
    path: 'execucao',
    component: ExecucaoComponent,
  },
  {
    path: 'import',
    component: ImportItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
