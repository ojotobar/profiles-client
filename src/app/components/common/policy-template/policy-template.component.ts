import { Component } from '@angular/core';
import { AppNameComponent } from '../app-name/app-name.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-policy-template',
  imports: [AppNameComponent, DatePipe],
  templateUrl: './policy-template.component.html',
  styles: ``
})
export class PolicyTemplateComponent {
  lastUpdated: Date = new Date(2025, 4, 25, 15, 43);
  email: string = 'info@profile-host.com';
}
