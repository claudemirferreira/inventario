import { User } from '../model/user';

import { Injectable, EventEmitter } from '@angular/core';
import { CurrentUser } from '../model/current-user';

@Injectable()
export class SharedService {

  public static instance: SharedService = null;
  currentUser = new CurrentUser();
  showTemplate = new EventEmitter<boolean>();

  constructor() {
    return SharedService.instance = SharedService.instance || this;
  }

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new SharedService();
    }
    return this.instance;
  }

  isLoggedIn(): boolean {
    if (this.currentUser == null) {
      return false;
    }
    return this.currentUser.username != null;
  }

}
