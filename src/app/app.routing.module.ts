import { HomeComponent } from './components/home/home.component';
import { ContagemComponent } from './components/contagem/contagem.component';
import { ItemComponent } from './components/item/item.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListInventarioComponent } from './components/list-inventario/list-inventario.component';
import { CadastroInventarioComponent } from './components/list-inventario/cadastro-inventario/cadastro-inventario.component';
import { ExecucaoComponent } from './components/execucao/execucao.component';
import { ListEmpresaComponent } from './components/list-empresa/list-empresa.component';
import { CadastroEmpresaComponent } from './components/list-empresa/cadastro-empresa/cadastro-empresa.component';
import { AuthGuard } from './components/login/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LoginComponent },
  {
      path: 'home',
      component: HomeComponent },
  {
    path: 'list-inventario',
    component: ListInventarioComponent,
    canActivate: [AuthGuard],
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
