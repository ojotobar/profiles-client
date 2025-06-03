import { Component, inject } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { MatIconModule } from '@angular/material/icon';
import { InlineBackComponent } from '../inline-back/inline-back.component';
import { PolicyTemplateComponent } from '../policy-template/policy-template.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-privacy-policy',
  imports: [MatIconModule, InlineBackComponent, PolicyTemplateComponent, MatButtonModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {
  elementId: string = 'pdf-content';
  dns: string = window.location.origin;
  docName: string = 'profile-host-privacy-policy';
  appService = inject(AppService)
}
