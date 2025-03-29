import { Component, inject } from '@angular/core';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-inline-back',
  imports: [],
  template: `
    <span class="linked" (click)="appService.goBack()">Back</span>
  `,
  styles: ``
})
export class InlineBackComponent {
  appService = inject(AppService)
}
