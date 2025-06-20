import { Component, inject, OnInit } from '@angular/core';
import { VersionTagModel } from '../../../models/common/common-models';
import { AlertModel } from '../../../models/common/alert-models';
import { VersionService } from '../../../services/version.service';
import { AppService } from '../../../services/app.service';
import { AlertComponent } from '../../common/alert/alert.component';
import { DatePipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AlertClassEnum, AlertIconEnum } from '../../../enums/alert-enums';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';

@Component({
  selector: 'app-tags',
  imports: [
    AlertComponent,
    DatePipe,
    MatProgressSpinner
  ],
  templateUrl: './tags.component.html',
  styles: ``
})
export class TagsComponent implements OnInit {
  loading: boolean = false;
  error!: Error | null;
  versions: VersionTagModel[] = [];
  alertInputs = new AlertModel('An error occurred', 
    'Something went wrong we couldn\'t get your data. Please try again')
  versionSvc = inject(VersionService);
  appService = inject(AppService);

  ngOnInit(): void {
    this.getVersions();
  }

  goBack() {
    this.appService.goBack()
  }

  getVersions(){
      this.loading = true;
      this.versionSvc.getVersionTagsObservable()
        .valueChanges
        .subscribe({
          next: (data: any) => {
            this.loading = (<boolean>data.loading);
            this.versions = (<VersionTagModel[]>data.data.portfolioVersions);
            if(!this.versions || this.versions.length <= 0){
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
}
