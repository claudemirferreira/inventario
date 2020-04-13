import { LancamentoComponent } from './components/lancamento/lancamento.component';
import { ContagemComponent } from './components/contagem/contagem.component';
import { ItemComponent } from './components/item/item.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'inventario',
    component: InventarioComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
