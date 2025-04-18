import { Component } from '@angular/core';
import { AlertComponent } from '../../common/alert/alert.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlertModel } from '../../../models/common/alert-models';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SystemRoleResponseModel } from '../../../models/account/accounts-models';

@Component({
  selector: 'app-role-management',
  imports: [
    AlertComponent,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatSelectModule
  ],
  templateUrl: './role-management.component.html',
  styles: ``
})
export class RoleManagementComponent {
  alert = new AlertModel();
  loading: boolean = false;
  error!: Error;
  roles: SystemRoleResponseModel[] = [];
}
