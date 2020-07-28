import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/model/empresa';
import { BaseComponent } from '../../../base/base.component';
import { Perfil } from './../../../model/perfil';
import { User } from './../../../model/user';
import { EmpresaService } from './../../../services/empresa.service';
import { PerfilService } from './../../../services/perfil.service';
import { UserDataService } from './../../../services/user-data.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent<T extends BaseComponent> implements OnInit {

  public hide: boolean = true;
  public hideConfirmation: boolean = true;
  public password: string;
  public passwordConfirmation: string;
  public formValidate: boolean;
  public perfis: Perfil[];
  public empresas: Empresa[];

  public selected: [];
  public empresaSelected: String;

  constructor(
    public dialogRef: MatDialogRef<T>, 
    private toastr: ToastrService,
    private perfilService: PerfilService,
    private userDataService: UserDataService,
    private empresaService: EmpresaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.data.user = this.data.update ? this.data.user : new User();
    this.password = "";
    this.formValidate = true;
    this.toastr.clear();
    this.listProfiles();
    this.afterRender();
    this.listarEmpresas();
  }

  afterRender() {
    if(this.data.user.codigo) {
      this.selected = this.data.user.perfis.map( ({id}) => id );
      this.empresaSelected = this.data.user.empresa.cnpj;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if(this.validate()) {
      this.data.user.password = this.password;
      this.data.user.perfis = this.selected;
      this.data.user.empresa = this.isAdmin ? this.empresaSelecionada : this.userDataService.getLoggedUser().empresa;      
      this.dialogRef.close(this.data.user);
    } 
  }

  listProfiles() {
    this.perfilService.findPerfil().subscribe((response) => {
      this.perfis = response;
    });
  }

  listarEmpresas() {
    this.empresaService.findAll().subscribe((response) => {
      this.empresas = response;
    });
  }

  get isNeedsToConfirmPassword() {
    return this.password.length > 6  ? true : false; 
  }

  private validate() {
    if(this.data.user.codigo) {
      if(this.password == this.passwordConfirmation) {
        return true;
      } else {
        this.formValidate = false;
        this.toastr.error("Senhas não correspondem");
        return false;
      }
    } else {
        if(this.data.user.nome == null || this.data.user.nome == 0) {
          this.toastr.error("O nome do usuário é um campo requerido !");
          return false;
        } else if(this.data.user.username == null || this.data.user.username.length == 0) {
          this.toastr.error("O usuername é um campo requerido !");
          return false;
        } else if(this.password == null || this.password.length == 0) {
          this.toastr.error("A senha é um campo requerido !");
          return false;
        } else if(this.password !== this.passwordConfirmation) {
          this.toastr.error("As senhas não correspondem");
          return false;
        }
    }

    return true;
  }

  get empresaSelecionada(): Empresa {
    const empresa = this.empresas.filter(e => {
      if(e.cnpj === this.empresaSelected) {
        return true;
      }

      return false;
    })[0];
    return empresa;
  }

  get isValidform(): boolean {
    return this.formValidate;
  }

  get isAdmin(): boolean {
    let user: User = this.userDataService.getLoggedUser();    
    const profile = user.perfis.filter(p => {
      if(p.id == 1) {
        return true;
      }
      return false;
    });
    
    return profile.length > 0 ? true : false; 
  }
}
