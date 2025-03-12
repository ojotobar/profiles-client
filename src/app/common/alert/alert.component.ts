import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AlertModel } from '../../models/common/alert-models';
import { AlertClassEnum, AlertIconEnum } from '../../enums/alert-enums';

@Component({
  selector: 'app-alert',
  imports: [
    MatIconModule
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  @Input() heading: string = '';
  @Input() message: string = '';
  @Input() icon: AlertIconEnum = AlertIconEnum.danger;
  @Input() bg: AlertClassEnum = AlertClassEnum.danger;
}
