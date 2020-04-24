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
import { ImportItemComponent } from './components/import-item/import-item.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { ExecucaoComponent } from './components/execucao/execucao.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListInventarioComponent,
    CadastroInventarioComponent,
    ImportItemComponent,
    ConfigurationComponent,
    ExecucaoComponent,

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
