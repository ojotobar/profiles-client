import { Component } from '@angular/core';
import { ApiKeyComponent } from '../../common/api-key/api-key.component';

@Component({
  selector: 'app-info-api',
  imports: [
    ApiKeyComponent
  ],
  templateUrl: './info-api.component.html',
  styleUrl: './info-api.component.scss'
})
export class InfoApiComponent {
  profileApi = `
  query {
    profile {
        name
        email
        bio
        phone
        location
        socialLinks {
            platform
            url
        }
    }
}
  `
}
