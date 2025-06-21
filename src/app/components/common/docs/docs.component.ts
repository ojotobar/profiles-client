import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppNameComponent } from '../app-name/app-name.component';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-docs',
  imports: [
    RouterLink,
    AppNameComponent
  ],
  templateUrl: './docs.component.html',
  styleUrl: './docs.component.scss'
})
export class DocsComponent {
  supportEmail = 'support@profile-host.com';
  isLoggedIn = false;
  apiKeyName = 'X_PPAPI_KEY';
  imageName = 'blueclikk';
  _ = inject(AppService).getIsLoggedIn.subscribe(l => this.isLoggedIn = l);
}
