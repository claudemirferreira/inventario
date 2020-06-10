import { DependencyInjector } from './base/dependency-injector';
import { SidenavService } from './services/sidenav.service';

import { Component, OnInit, ViewChild, ViewContainerRef, Injector } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SharedService } from './services/shared.service';
import { CurrentUser } from './model/current-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  title = ' - Sistema de Gerenciamento de Relatórios';
  isAuthenticated: boolean;
  showTemplate: boolean = false;
  shared : SharedService;

  constructor(injector: Injector) {
    DependencyInjector.setup(injector);
    this.shared = SharedService.getInstance();
    this.logoff();
  }

  logoff(){
    this.shared.currentUser = new CurrentUser();
    this.isAuthenticated = false;
  }

  async ngOnInit() {
    this.shared.showTemplate.subscribe(
      show => this.showTemplate = show
    );
  }

  showContentWrapper(){
    return {
      'content-wrapper': this.shared.isLoggedIn()
    }
  }

}
