import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarModel } from '../models/common/snackbar-model';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-tool-bar',
  imports: [
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    NgbCollapseModule,
    RouterLink
  ],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.scss'
})
export class ToolBarComponent implements OnInit {
  loggedIn: boolean = false;
  isSideBarOpened: boolean = false;
  snackBarModel: SnackbarModel = new SnackbarModel();
  isMenuCollapsed = true;

  constructor(private readonly appService: AppService, private dialog: MatDialog){
    this.appService.getIsSidebarOpened
      .subscribe(s => this.isSideBarOpened = s);

    this.appService.getIsLoggedIn
      .subscribe(l => this.loggedIn = l);
  }

  ngOnInit(): void {
    
  }

  toggleShowSidebar() {
    this.appService
      .setIsSidebarOpened(!this.isSideBarOpened);
  }
}
