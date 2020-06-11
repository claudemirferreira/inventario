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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  user = new Autentication();
  shared : SharedService;
  @Input() message: string | null;

  erro: Erro;

  constructor(private userService: UserService,
              private perfilService: PerfilService,
              private router: Router) {
    this.shared = new SharedService();
    this.shared.currentUser.token = null;
    this.shared.currentUser.username = null;
    this.shared.showTemplate.emit(false);
    console.log('entrou no login========')
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
        this.shared.currentUser = userAuthentication;
        console.log('USUARIO='+JSON.stringify(this.shared.currentUser.token));
        this.shared.showTemplate.emit(true);
        console.log('######lista perfillllll');
        this.listarPerfilUsuario();
        this.router.navigate(['/home']);
    } , err => {

      console.log('erro de autenticação='+ JSON.stringify(err));

    });
  }

  listarPerfilUsuario(): void {
    this.message = null;
    this.perfilService.findPerfil().subscribe((list: Perfil[]) => {
      this.shared.listPerfil = list;
      console.log('USUARIO='+JSON.stringify(list));
      console.log('######lista perfillllll');
  } , err => {

    console.log('erro de autenticação='+ JSON.stringify(err));

  });
}

  cancelLogin(){
    this.message = '';
    this.user = new Autentication();
    window.location.href = '/login';
    window.location.reload();
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }

}
