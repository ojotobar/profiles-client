import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AlertModel } from '../../../models/common/alert-models';

@Component({
  selector: 'app-alert',
  imports: [
    MatIconModule
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  @Input() alertInputs = new AlertModel();
}
