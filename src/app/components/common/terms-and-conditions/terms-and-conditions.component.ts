import { Component, inject } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TermsTemplateComponent } from '../terms-template/terms-template.component';
import { InlineBackComponent } from '../inline-back/inline-back.component';

@Component({
  selector: 'app-terms-and-conditions',
  imports: [MatIconModule, MatButtonModule, TermsTemplateComponent, InlineBackComponent],
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.scss'
})
export class TermsAndConditionsComponent {
  baseAddress: string = window.location.origin;
  elementId: string = 'pdf-content';
  docName: string = 'pro-files-terms-and-condotions'
  appService = inject(AppService);       
}
