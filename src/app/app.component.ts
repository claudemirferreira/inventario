import { DependencyInjector } from './base/dependency-injector';
import { SidenavService } from './services/sidenav.service';

import { Component, OnInit, ViewChild, ViewContainerRef, Injector } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  title = 'Inventário';
  isAuthenticated: boolean;
  showTemplate: boolean = false;

  constructor(injector: Injector) {
    DependencyInjector.setup(injector);
    // this.logoff();
  }

  logoff(){
  
  }

  async ngOnInit() {
    // this.shared.showTemplate.subscribe(
    //   show => this.showTemplate = show
    // );
  }

  showContentWrapper(){
    // return {
    //   'content-wrapper': this.shared.isLoggedIn()
    // }
  }

}
