import { SidenavService } from '../../services/sidenav.service';

import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

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

  @ViewChild('content', { static: true, read: ViewContainerRef })
  private vcf: ViewContainerRef;
  shared: SharedService;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sidenavService: SidenavService
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.sidenavService.setPanel(this.sidePanel);
    this.sidenavService.setContentVcf(this.vcf);
  }

  isLoggedIn(): boolean {
    return this.shared.isLoggedIn();
  }
}
