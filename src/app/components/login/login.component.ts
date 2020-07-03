import { ToastrService } from 'ngx-toastr';
import { AuthTokenService } from './../../services/auth-token.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Autentication } from 'src/app/model/autentication';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import { CurrentUser } from '../../model/current-user';
import { Erro } from '../../model/erro'
import { Router } from '@angular/router';
import { PerfilService } from 'src/app/services/perfil.service';
import { Perfil } from 'src/app/model/perfil';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  shared: SharedService;
  currentUser: CurrentUser;

  @Input() message: string | null;

  erro: Erro;
  user = new Autentication();

  constructor(private userService: UserService,
    private perfilService: PerfilService,
    private atuhTokenService: AuthTokenService,
    private toastr: ToastrService,
    private _snackBar: MatSnackBar,
    private router: Router) {
    this.shared = new SharedService();
    this.shared.currentUser.token = null;
    this.shared.currentUser.username = null;
    this.shared.showTemplate.emit(false);
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login(): void {
    this.message = null;
    this.userService.login(this.user).subscribe((userAuthentication: CurrentUser) => {
      if(!userAuthentication.token) {
        this.toastr.error('Dados de acesso inválidos.');
        console.log("Falha ao logar! ")
      } else {
        this.userService.saveUserData(userAuthentication);
        this.currentUser = userAuthentication;
        this.shared.showTemplate.emit(true);

        this.listarPerfilUsuario();
        window.location.reload();
      }
    }, err => {
      this.openSnackBar('Alerta: ' + err.error.error, 'OK');
      console.log('erro de autenticação=' + JSON.stringify(err));
    });
  }

  listarPerfilUsuario(): void {
    if(this.currentUser) {
      this.message = null;
      this.perfilService.findPerfil().subscribe((list: Perfil[]) => {
        this.userService.saveProfileList(list);
      }, err => {
        console.log('erro de autenticação=' + JSON.stringify(err));
      });
    }
  }

  cancelLogin() {
    this.message = '';
    this.user = new Autentication();
    window.location.href = '/login';
    window.location.reload();
  }

  getFormGroupClass(isInvalid: boolean, isDirty: boolean): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
