import { Component, inject } from '@angular/core';
import { AlertComponent } from '../../common/alert/alert.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlertModel } from '../../../models/common/alert-models';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SystemRoleResponseModel } from '../../../models/account/accounts-models';
import { AccountService } from '../../../services/account.service';
import { DialogService } from '../../../services/dialog.service';
import { AppService } from '../../../services/app.service';
import { AlertClassEnum, AlertIconEnum } from '../../../enums/alert-enums';
import { CommonModule } from '@angular/common';
import { MatDialogData } from '../../../models/common/snackbar-model';

@Component({
  selector: 'app-role-management',
  imports: [
    AlertComponent,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatSelectModule,
    CommonModule
  ],
  templateUrl: './role-management.component.html',
  styles: ``
})
export class RoleManagementComponent {
  alert = new AlertModel();
  loading: boolean = false;
  error!: Error;
  roles: SystemRoleResponseModel[] = [];
  accountService = inject(AccountService);
  dialogService = inject(DialogService);
  appService = inject(AppService);

  ngOnInit() {
    this.getRoles();
  }

  getRoles(){
    this.loading = true;
    this.accountService.getSystemRoles()
      .valueChanges
      .subscribe({
        next: (data) => {
          this.loading = <boolean>data.loading;
          this.roles = <SystemRoleResponseModel[]>data.data.systemRoles;
          if(this.roles && this.roles.length <= 0){
            this.alert = this.appService.mapAlertMessage(this.alert, 'No record',
              'No role record found', AlertIconEnum.info, AlertClassEnum.info)
          }
        },
        error: (error: Error) => {
          this.loading = false;
          this.error = error;
          this.alert = this.appService.mapAlertMessage(this.alert, 'Error occurred',
            'Something went wrong while getting the record', AlertIconEnum.danger, AlertClassEnum.danger)
        }
      })
  }

  openAddRoleDialog(){
    let ref = this.dialogService.openAddRoleDialog('Role')
    ref.afterClosed().subscribe(result => {
      let res = (<MatDialogData>result);
      if(res.refresh){
        this.getRoles()
      }
    })
  }

  openUpdateRoleDialog(id: string, name: string){
    if(id){
      let ref = this.dialogService.openUpdateRoleDialog(id, name)
      ref.afterClosed().subscribe(result => {
        let res = (<MatDialogData>result);
        if(res.refresh){
          this.getRoles()
        }
      })
    }
  }

  openDeleteRoleDialog(id: string, name: string){
    if(id && name){
      let ref = this.dialogService.openDeleteRoleDialog(id, name)
      ref.afterClosed().subscribe(result => {
        let res = (<MatDialogData>result);
        if(res.refresh){
          this.getRoles()
        }
      })
    }
  }
}
