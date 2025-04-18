import { Component, Inject, inject } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { AccountService } from '../../../services/account.service';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogData } from '../../../models/common/snackbar-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddRoleComponent } from '../add-role/add-role.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-role',
  imports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './delete-role.component.html',
  styles: ``
})
export class DeleteRoleComponent {
  loading: boolean = false;
  appService = inject(AppService);
  accountService = inject(AccountService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData,
    public readonly dialogRef: MatDialogRef<AddRoleComponent>){
  }

  deleteRecord(){
    console.log(this.data)
  }
}
