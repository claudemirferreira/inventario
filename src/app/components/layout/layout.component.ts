import { SidenavService } from '../../services/sidenav.service';

import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  @ViewChild('panel', { static: true })
  private sidePanel: MatSidenav;

  public positionOptions: TooltipPosition[] = ['left']; // Tooltip postion
  public position = new FormControl(this.positionOptions[0]);

  @ViewChild('content', { static: true, read: ViewContainerRef })
  private vcf: ViewContainerRef;
  shared: SharedService;

  mySubscription: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sidenavService: SidenavService,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();

  }

  ngOnInit() {
    this.sidenavService.setPanel(this.sidePanel);
    this.sidenavService.setContentVcf(this.vcf);
  }

  logout() {
    console.log('entrou no logout');
    this.router.navigate(['/login']);
    this.shared.currentUser.token = null;
    this.shared.currentUser.nome = '';
    this.shared.currentUser.codigo = 0;
    this.shared.currentUser.username = '';
    this.router.navigate(['/login']);

    console.log('/login------------------');


  }

  isLoggedIn(): boolean {
    return this.shared.isLoggedIn();
  }

}
