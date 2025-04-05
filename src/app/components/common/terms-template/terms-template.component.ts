import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AppNameComponent } from '../app-name/app-name.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms-template',
  imports: [DatePipe, AppNameComponent, RouterLink],
  templateUrl: './terms-template.component.html',
  styles: ``
})
export class TermsTemplateComponent {
  email: string = 'info@pro-file.com'
  lastUpdatedDate: Date = new Date(2025, 4, 25, 13, 45, 45)
}
