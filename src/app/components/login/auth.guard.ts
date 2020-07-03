import { UserDataService } from './../../services/user-data.service';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
} from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharedService } from 'src/app/services/shared.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public shared: SharedService;

  constructor(
    private userDatService: UserDataService,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    const loggedUser = this.userDatService.getLoggedUser();
    console.log("AuthGuard: " + loggedUser);
    if (loggedUser) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
