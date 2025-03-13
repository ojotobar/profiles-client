import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppNameComponent } from '../app-name/app-name.component';

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
  supportEmail = 'support@pro-files.com';
}
