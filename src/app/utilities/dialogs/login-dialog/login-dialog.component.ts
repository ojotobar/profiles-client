import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AppService } from '../../../app.service';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { ResetPasswordDialogComponent } from '../reset-password-dialog/reset-password-dialog.component';
import { FormsModule, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormErrorStateMatcher } from '../../../../models/error-state-matcher';

@Component({
  selector: 'app-login-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent {
  passwordFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  errorMatcher = new FormErrorStateMatcher();

  constructor(private appService: AppService, private dialog: MatDialog){}
  openRegisterDialog() {
      this.dialog.closeAll()
      this.dialog.open(RegisterDialogComponent, {
        position: { top: '12vh' },
        disableClose: true
      });
    }

  openPasswordResetDialog(){
    this.dialog.closeAll()
      this.dialog.open(ResetPasswordDialogComponent, {
        position: { top: '12vh' },
        disableClose: true
      });
  }
}
