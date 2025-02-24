import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AppService } from '../../../app.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { FormsModule, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormErrorStateMatcher } from '../../../../models/error-state-matcher';

@Component({
  selector: 'app-reset-password-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './reset-password-dialog.component.html',
  styleUrl: './reset-password-dialog.component.scss'
})
export class ResetPasswordDialogComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  errorMatcher = new FormErrorStateMatcher();

  constructor(private dialog: MatDialog){}

  openLoginDialog() {
    this.dialog.closeAll()
    this.dialog.open(LoginDialogComponent, {
      position: { top: '12vh' },
      disableClose: true
    });
  }
}
