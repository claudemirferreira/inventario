import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app/app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../app/components/material/material.module';
import { LoginComponent } from '../app/components/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListInventarioComponent } from './components/list-inventario/list-inventario.component';
import { CadastroInventarioComponent } from './components/list-inventario/cadastro-inventario/cadastro-inventario.component';
import { ExecucaoComponent } from './components/execucao/execucao.component';
import { ListEmpresaComponent } from './components/list-empresa/list-empresa.component';
import { CadastroEmpresaComponent } from './components/list-empresa/cadastro-empresa/cadastro-empresa.component';
import { DialogMensagemComponent } from './components/share/dialog-mensagem/dialog-mensagem.component';
import { MensagemErrorComponent } from './components/share/mensagem-error/mensagem-error.component';
import { ContagemComponent } from './components/contagem/contagem.component';
import { ImportXlsComponent } from './components/list-inventario/import-xls/import-xls.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListInventarioComponent,
    CadastroInventarioComponent,
    ExecucaoComponent,
    ListEmpresaComponent,
    CadastroEmpresaComponent,
    DialogMensagemComponent,
    MensagemErrorComponent,
    ContagemComponent,
    ImportXlsComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
