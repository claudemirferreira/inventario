import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Autentication } from 'src/app/model/autentication';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import { CurrentUser } from '../../model/current-user';
import { Erro } from '../../model/erro'
import { Router } from '@angular/router';

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
              private router: Router) {
    this.shared = SharedService.getInstance();
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
        this.shared.currentUser = userAuthentication;
        console.log('USUARIO='+JSON.stringify(this.shared.currentUser.token));
        this.shared.showTemplate.emit(true);
        this.router.navigate(['/contagem']);
    } , err => {

      console.log('erro de autenticação='+ JSON.stringify(err));
      /*
      //this.erro =  err.status;
      console.log(this.erro.status);
      if(err.status == '401')
        this.message = 'Login e senha invalidos';
      else
        this.message = 'Erro: entre em contato com admin';
        this.shared.currentUser.token = null;
        this.shared.currentUser.username = null;
        this.shared.showTemplate.emit(false);
        console.log(this.message);
        */

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
