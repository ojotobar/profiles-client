import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppService } from '../app.service';
import { RouterLink } from '@angular/router';
import { LoginDialogComponent } from '../utilities/dialogs/login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../utilities/dialogs/register-dialog/register-dialog.component';
//import { SnackbarClassEnum, SnackbarIconEnum } from '../enums/snackbar-enum';
import { SnackbarModel } from '../models/common/snackbar-model';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private appService: AppService, private dialog: MatDialog){
    this.appService.getIsSidebarOpened
      .subscribe(s => this.isSideBarOpened = s);

    this.appService.getIsLoggedIn
      .subscribe(l => this.loggedIn = l);
  }

  ngOnInit(): void {
    
  }

  toggleLoginDialogue(): void {
    this.dialog.closeAll()
    this.dialog.open(LoginDialogComponent, {
      position: { top: '12vh' },
      disableClose: true
    });
    this.appService
      .setIsLoggedIn(!this.loggedIn);

    //this.appService.openSnackBar("Logged in successfully.", SnackbarClassEnum.Success, SnackbarIconEnum.Success)
  }

  openRegisterDialog() {
    this.dialog.closeAll()
    this.dialog.open(RegisterDialogComponent, {
      position: { top: '12vh' },
      disableClose: true
    });
  }

  toggleShowSidebar() {
    this.appService
      .setIsSidebarOpened(!this.isSideBarOpened);
  }
}
