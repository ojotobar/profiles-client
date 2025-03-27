import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AlertComponent } from '../../common/alert/alert.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { AlertIconEnum, AlertClassEnum } from '../../../enums/alert-enums';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { CertificationResultModel } from '../../../models/certifications/certifications-models';
import { AlertModel } from '../../../models/common/alert-models';
import { MatDialogData } from '../../../models/common/snackbar-model';
import { AppService } from '../../../services/app.service';
import { CertificationsService } from '../../../services/certifications.service';
import { DialogService } from '../../../services/dialog.service';
import { ValueornullPipe } from '../../../pipes/valueornull.pipe';

@Component({
  selector: 'app-certitication-management',
  imports: [
    RouterLink,
    MatIconModule,
    DatePipe,
    AlertComponent,
    MatOptionModule,
    MatSelectModule,
    MatProgressSpinner,
    MatButtonModule,
    ValueornullPipe
  ],
  templateUrl: './certitication-management.component.html',
  styleUrl: './certitication-management.component.scss'
})
export class CertiticationManagementComponent {
  loading: boolean = false;
  error!: Error | null;
  certifications: CertificationResultModel[] = [];
  alertInputs = new AlertModel('An error occurred', 
    'Something went wrong we couldn\'t get your data. Please try again')
  certService = inject(CertificationsService);
  appService = inject(AppService);
  dialogService = inject(DialogService);

  ngOnInit() {
    this.getCertifications();
  }

  getCertifications(){
    this.loading = true;
    this.certService.getCertificationsObservable()
      .valueChanges
      .subscribe({
        next: (data: any) => {
          this.loading = (<boolean>data.loading);
          this.certifications = (<CertificationResultModel[]>data.data.certifications);
          if(!this.certifications || this.certifications.length <= 0){
            this.alertInputs = this.appService.mapAlertMessage(this.alertInputs,
              'No record found', 'No certification record found. Please add some.', AlertIconEnum.info, AlertClassEnum.info
            )
          }
        },
        error: (error: Error) => {
          this.error = error;
          this.loading = false;
          this.appService.openSnackBar('Something went wrong we couldn\'t get the data',
            SnackbarClassEnum.Danger, SnackbarIconEnum.Danger
          )
        }
      })
  }

  goBack() {
    this.appService.goBack();
  }

  confirmDelete(id: string, name: string){
    let ref = this.dialogService.openDeleteCertificationDialog(id, name);
    ref.afterClosed().subscribe(result => {
      let response = (<MatDialogData>result);
      if(response.refresh){
        this.getCertifications();
      }
    })
  }
}
