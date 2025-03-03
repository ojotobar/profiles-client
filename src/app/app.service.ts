import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { SnackbarAnnotatedComponent } from './utilities/snackbar-annotated/snackbar-annotated.component';
import { SnackbarClassEnum, SnackbarIconEnum } from './enums/snackbar-enum';
import { SnackbarModel } from './models/common/snackbar-model';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from './utilities/dialogs/register-dialog/register-dialog.component';
import { LoginDialogComponent } from './utilities/dialogs/login-dialog/login-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private isSidebarOpened = new BehaviorSubject(false);
  private isLoggedIn = new BehaviorSubject(false);
  private snackbarModel = new SnackbarModel();
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  getIsSidebarOpened = this.isSidebarOpened.asObservable();
  getIsLoggedIn = this.isLoggedIn.asObservable();

  constructor(private dialog: MatDialog) { }

  setIsSidebarOpened(isSidebarOpened: boolean){
    this.isSidebarOpened.next(isSidebarOpened);
  }

  setIsLoggedIn(isLoggedIn: boolean){
    this.isLoggedIn.next(isLoggedIn);
  }

  openSnackBar(message: string, color: SnackbarClassEnum, icon: SnackbarIconEnum){
    this.snackbarModel.message = message;
    this.snackbarModel.icon = icon;
    this.snackbarModel.color = color;

    this._snackBar.openFromComponent(SnackbarAnnotatedComponent, {
      duration:  7000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: this.snackbarModel
    });
  }

  openRegistrationDialog(): void {
    this.dialog.closeAll()
    this.dialog.open(RegisterDialogComponent, {
      position: { top: '12vh' },
      disableClose: true
    });
  }

  openLoginDialogue(): void {
    this.dialog.closeAll()
    this.dialog.open(LoginDialogComponent, {
      position: { top: '12vh' },
      disableClose: true
    });
  }
}
