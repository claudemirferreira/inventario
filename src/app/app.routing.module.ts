import { UserComponent } from './components/user/user.component';
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
      component: HomeComponent, 
      canActivate: [AuthGuard] },
  {
    path: 'list-inventario',
    component: ListInventarioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cadastro-inventario/:id',
    component: CadastroInventarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastro-inventario',
    component: CadastroInventarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'item',
    component: ItemComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contagem',
    component: ContagemComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'execucao',
    component: ExecucaoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastro-empresa',
    component: CadastroEmpresaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastro-empresa/:cnpj',
    component: CadastroEmpresaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-empresa',
    component: ListEmpresaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuario',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
