import { Component, inject } from '@angular/core';
import { SectionsModel } from '../../models/common/sections-model';
import { AppService } from '../../services/app.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  imports: [
    RouterLink
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  sections = inject(AppService).getSections();
}
