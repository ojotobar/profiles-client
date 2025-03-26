import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA, 
  MatSnackBarAction, 
  MatSnackBarActions, 
  MatSnackBarLabel, 
  MatSnackBarRef
} from '@angular/material/snack-bar';
import { SnackbarModel } from '../../../models/common/snackbar-model';

@Component({
  selector: 'app-snackbar-annotated',
  imports: [
    MatIconModule,
    MatButtonModule, 
    MatSnackBarLabel, 
    MatSnackBarActions, 
    MatSnackBarAction
  ],
  templateUrl: './snackbar-annotated.component.html',
  styleUrl: './snackbar-annotated.component.scss'
})
export class SnackbarAnnotatedComponent {
  snackBarRef = inject(MatSnackBarRef);

  constructor(@Inject(MAT_SNACK_BAR_DATA) public model: SnackbarModel){}
}
