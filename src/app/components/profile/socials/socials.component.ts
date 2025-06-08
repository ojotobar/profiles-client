import { Component, inject, Input } from '@angular/core';
import { SocialMediaModel } from '../../../models/profile/profile-models';
import { AlertModel } from '../../../models/common/alert-models';
import { AlertComponent } from '../../common/alert/alert.component';
import { AlertClassEnum, AlertIconEnum } from '../../../enums/alert-enums';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from '../../../services/dialog.service';
import { MatDialogData } from '../../../models/common/snackbar-model';

@Component({
  selector: 'app-socials',
  imports: [AlertComponent, MatIconModule, MatButtonModule],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.scss'
})
export class SocialsComponent {
  @Input() data: SocialMediaModel[] = [];
  alert = new AlertModel('', 'No social media record added', AlertClassEnum.info, AlertIconEnum.info);
}
