import { ToastrService } from 'ngx-toastr';
import { User } from './../../../model/user';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from './../../../base/base..component';
import { Component, OnInit, Inject } from '@angular/core';
import { throwIfEmpty } from 'rxjs/operators';

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

  constructor(
    public dialogRef: MatDialogRef<T>, 
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.data.user = this.data.update ? this.data.user : new User();
    console.log(this.data.user)
    this.password = "";
    this.formValidate = true;
    this.toastr.clear();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if(this.validate()) {
      this.data.user.password = this.password;
      this.dialogRef.close(this.data.user);
    }    
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

  get isValidform(): boolean {
    return this.formValidate;
  }
}
