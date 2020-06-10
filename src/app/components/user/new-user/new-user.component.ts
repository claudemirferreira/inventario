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

  private update?: boolean 
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
    this.update = this.data ? true : false;    
    this.password = "";
    this.formValidate = true;
    this.toastr.clear();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if(this.validate()) {
      this.data.password = this.password;
      this.dialogRef
    }    
  }

  get isNeedsToConfirmPassword() {
    return this.password.length > 6  ? true : false; 
  }

  private validate() {
    if(this.update) {
      if(this.password == this.passwordConfirmation) {
        return true;
      }
    }

    this.formValidate = false;
    this.toastr.error("Senhas não correspondem");

    return false;
  }

  get isValidform(): boolean {
    return this.formValidate;
  }

}
