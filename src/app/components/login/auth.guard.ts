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

  constructor(private userService: UserService, private router: Router) {
    this.shared = SharedService.getInstance();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (this.shared.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
