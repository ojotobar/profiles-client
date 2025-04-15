import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { FaqsManagementComponent } from '../../tabs/faqs-management/faqs-management.component';
import { UserManagementComponent } from '../../tabs/user-management/user-management.component';
import { RoleManagementComponent } from '../../tabs/role-management/role-management.component';
import { AuditLogsComponent } from '../../tabs/audit-logs/audit-logs.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatTabsModule,
    FaqsManagementComponent,
    UserManagementComponent,
    RoleManagementComponent,
    AuditLogsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  
}
