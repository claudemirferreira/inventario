import { UserDataService } from './services/user-data.service';
import { AuthTokenService } from './services/auth-token.service';
import { GenericStorageService } from './services/generic-storage.service';
import { GenericSessionService } from './services/generic-session.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app/app.routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from '../app/components/material/material.module';
import { LoginComponent } from '../app/components/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

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
import { ItemComponent } from './components/item/item.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UserService } from './services/user.service';
import { AuthGuard } from './components/login/auth.guard';
import { AuthInterceptor } from './components/login/AuthInterceptor';
import { UserComponent } from './components/user/user.component';
import { RemoveComponent } from './base/dialog/remove/remove.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToastrModule } from 'ngx-toastr';
import { NewUserComponent } from './components/user/new-user/new-user.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'


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
    ItemComponent,
    LayoutComponent,
    UserComponent,
    RemoveComponent,
    NewUserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatPaginatorModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot({
      preventDuplicates: true,
      enableHtml: true
    }),

  ],
  providers: [UserService,
    AuthGuard,
    GenericSessionService, 
    GenericStorageService,
    AuthTokenService,
    UserService,
    UserDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
