import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { apiKeyTooltip, ProfileModel, ProfileResultModel, ProfileSummaryResponseModel } from '../../../models/profile/profile-models';
import { AppService } from '../../../services/app.service';
import { ProfileService } from '../../../services/profile.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertModel } from '../../../models/common/alert-models';
import { AlertComponent } from '../../common/alert/alert.component';
import { getGenericErrorMessage, MatDialogFileUploadData } from '../../../models/common/common-models';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';
import { AlertClassEnum, AlertIconEnum } from '../../../enums/alert-enums';
import { InitialsPipe } from '../../../pipes/initials.pipe';
import { ImageUrlPipe } from '../../../pipes/image-url.pipe';
import { GenderEnum } from '../../../enums/gender-enum';
import { DatePipe } from '@angular/common';
import { MatTooltipModule} from '@angular/material/tooltip';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from '../../../services/dialog.service';
import { MatDialogData } from '../../../models/common/snackbar-model';
import { UploadFileTypes, UploadTypeEnum } from '../../../enums/upload-types-enums';
import { AddressPipe } from '../../../pipes/address.pipe';

@Component({
  selector: 'app-profile',
  imports: [
    MatIconModule,
    RouterLink,
    MatProgressSpinnerModule,
    AlertComponent,
    InitialsPipe,
    ImageUrlPipe,
    DatePipe,
    MatTooltipModule,
    MatButtonModule,
    AddressPipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  barWidth: string = '';
  barColor: string = '';
  apiKey: string = '';
  tips: string = apiKeyTooltip;
  loading: boolean = false;
  isMale: boolean = true;
  profile!: ProfileModel;
  profileSummary!: ProfileSummaryResponseModel;
  alert = new AlertModel();
  error!: Error;
  appService = inject(AppService);
  profileService = inject(ProfileService);
  dialogService = inject(DialogService)

  ngOnInit(){
    this.getProfile();
    //this.getProfileSummary();
  }

  copy(){
    if (this.appService.copyText(this.apiKey)) {
      this.appService.openSnackBar('API Key copied to your clipboard', SnackbarClassEnum.Info, SnackbarIconEnum.Info, 2000)
    }
  }

  getProfile(){
    this.loading = true;
    this.profileService.getProfile()
      .valueChanges
      .subscribe({
        next: (data: any) => {
          this.profile = (<ProfileModel>data.data.profile);
          if(!this.profile){
            this.alert = this.appService.mapAlertMessage(this.alert,
              'No record', 'No record found for this profile. Please try again later',
              AlertIconEnum.danger, AlertClassEnum.danger
          )
          } else {
            this.isMale = this.profile.gender == GenderEnum.Male;
            this.getProfileSummary()
          }
          this.loading = (<boolean>data.loading);
        },
        error: (error: Error) => {
          this.loading = false;
          this.error = error;
          this.alert = this.appService.mapAlertMessage(this.alert,
              'An error occurred', getGenericErrorMessage(OperationTypeEnum.get),
              AlertIconEnum.danger, AlertClassEnum.danger
          )
        }
      })
  }

  getProfileSummary(){
    this.loading = true;
    this.profileService.getProfileSummaryObservable()
      .valueChanges
      .subscribe({
        next: (data: any) => {
          this.profileSummary = (<ProfileSummaryResponseModel>data.data);
          if(this.profileSummary && this.profileSummary.userSummary){
            this.barWidth = this.profileSummary.userSummary.progress + '%';
            this.barColor = this.getProgressColor(this.profileSummary.userSummary.progress);
            this.apiKey = this.profileSummary.userSummary.apiKey;
          } else {
            this.alert = this.appService.mapAlertMessage(this.alert,
              'No record', 'No profile summary record found. Please try again later',
              AlertIconEnum.danger, AlertClassEnum.danger)
          }
        },
        error: (error: Error) => {
          this.error = error;
          this.alert = this.appService.mapAlertMessage(this.alert,
              'An error occurred', getGenericErrorMessage(OperationTypeEnum.get),
              AlertIconEnum.danger, AlertClassEnum.danger
          )
        }
      })
  }

  getProgressColor(progress: number) : string {
    if(progress < 40){
      return '#501212';
    } else if(progress >= 40 && progress < 60){
      return '#777721';
    } else if(progress >= 60 && progress < 80){
      return '#101042';
    } else {
      return '#104c12';
    }
  }

  get tasksText(): string {
    let tasks: string[] = [];
    let summary = this.profileSummary.userSummary;

    if(!this.profile.location){
      tasks.push('Location');
    }
    if(!this.profile.photoUrl){
      tasks.push('Profile Photo');
    }
    if(!this.profile.cvUrl){
      tasks.push('CV/Resume');
    }
    if(summary.education <= 0){
      tasks.push('Education');
    }
    if(summary.experience <= 0){
      tasks.push('Experience');
    }
    if(summary.skills <= 0){
      tasks.push('Skills')
    }
    if(!summary.hasCareerSummary){
      tasks.push('Professional Summary')
    }

    let multiple = tasks.length > 1;
    let record = multiple ? ' records ' : ' record ';
    let plural = multiple ? ' are ' : ' is ';

    if(tasks.length > 1){
      let popped = tasks.pop();
      tasks.push('and ' + popped)
    }
    
    return tasks.join(', ') + record + plural + 'required to generate API Key';
  }

  openPhotoUploadDialog() {
    let data: MatDialogFileUploadData = {
      id: this.profile.id,
      type: UploadTypeEnum.ProfilePhoto,
      accept: UploadFileTypes.Images,
      refreshAfterClose: false
    }

    let ref = this.dialogService.openFileUploadDialog(data);
    ref.afterClosed().subscribe(result => {
      let res = (<MatDialogFileUploadData>result);
      if(res.refreshAfterClose){
        this.getProfile();
      }
    })
  }

  openCvUploadDialog() {
    let data: MatDialogFileUploadData = {
      id: this.profile.id,
      type: UploadTypeEnum.Resume,
      accept: UploadFileTypes.Documents,
      refreshAfterClose: false
    }

    let ref = this.dialogService.openFileUploadDialog(data);
    ref.afterClosed().subscribe(result => {
      let res = (<MatDialogFileUploadData>result);
      if(res.refreshAfterClose){
        this.getProfile();
      }
    })
  }

  openLocationDialog() {
    let isNew = this.profile.location === null;
    let text = isNew ? 'Add' : 'Update';
    let ref  = this.dialogService.openLocationDialog(this.profile.id, text, isNew)
    ref.afterClosed().subscribe(result => {
      let res = (<MatDialogData>result);
      if(res.refresh){
        this.getProfile()
      }
    })
  }
}