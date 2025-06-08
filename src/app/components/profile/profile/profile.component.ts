import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ApiKeyResponseModel, apiKeyTooltip, DetailedProfileModel, ProfileModel, ProfileSummaryModel } from '../../../models/profile/profile-models';
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
import { AccountService } from '../../../services/account.service';
import { SocialsComponent } from '../socials/socials.component';

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
    AddressPipe,
    SocialsComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  barWidth: string = '';
  barColor: string = '';
  apiKey: string = '';
  showCopyMessage: boolean = false;
  tips: string = apiKeyTooltip;
  loading: boolean = false;
  genderColor: string = 'not-specified-theme';
  keyGenerating: boolean = false;
  profile!: ProfileModel;
  profileSummary!: ProfileSummaryModel;
  alert = new AlertModel();
  error!: Error;
  appService = inject(AppService);
  profileService = inject(ProfileService);
  dialogService = inject(DialogService);
  accountService = inject(AccountService);
  router = inject(Router);

  ngOnInit(){
    this.getDetailedProfile();
  }

  copy(){
    if (this.appService.copyText(this.apiKey)) {
      this.showCopyMessage = true;

      setTimeout(() => {
        this.showCopyMessage = false;
      }, 2000);
    }
  }

  getDetailedProfile(){
    this.loading = true;
    this.profileService.getDetailedProfile()
      .valueChanges
      .subscribe({
        next: (data: any) => {
          this.loading = (<boolean>data.loading);
          let result = (<DetailedProfileModel>data.data.detailedProfile);
          if(!result){
            this.alert = this.appService.mapAlertMessage(this.alert,
              'No record', 'No record found for this profile. Please try again later',
              AlertIconEnum.danger, AlertClassEnum.danger
          )
          } else {
            this.profile = result.profile;
            this.profileSummary = result.profileSummary;
            this.barWidth = this.profileSummary.progress + '%';
            this.barColor = this.getProgressColor(this.profileSummary.progress);
            this.apiKey = this.profileSummary.apiKey;
            this.genderColor = this.getGenderColor(this.profile.gender);
          }
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
    let summary = this.profileSummary;

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
    if(!this.profile.socialMedia){
      tasks.push("Social Media")
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
        this.getDetailedProfile();
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
        this.getDetailedProfile();
      }
    })
  }

  goToSocialMedia(id: string) {
    this.router.navigate([`/profile`, id, 'social-media']);
  }

  openLocationDialog() {
    let isNew = this.profile.location === null;
    let text = isNew ? 'Add' : 'Update';
    let ref  = this.dialogService.openLocationDialog(this.profile.id, text, isNew)
    ref.afterClosed().subscribe(result => {
      let res = (<MatDialogData>result);
      if(res.refresh){
        this.getDetailedProfile()
      }
    })
  }

  openChangePasswordDialog(){
    let ref = this.dialogService.openChangePasswordDialog()
    ref.afterClosed().subscribe(result => {
      let res = (<MatDialogData>result);
      if(res.refresh){
        this.accountService.logout();
        this.router.navigate(['/account/login'])
      }
    })
  }

  openProfileDetailsUpdateDialog() {
    let ref = this.dialogService.openUpdateProfileDetailsDialog()
    ref.afterClosed().subscribe(result => {
      let res = (<MatDialogData>result);
      if(res && res.refresh){
        this.getDetailedProfile();
      }
    })
  }

  generateApiKey() {
    this.keyGenerating = true;
    this.profileService.generateApiKeyObservable()
      .valueChanges
      .subscribe({
        next: (data: any) => {
          this.keyGenerating = (<boolean>data.loading);
          let response = (<ApiKeyResponseModel>data.data.apiKey);
          if(response.success){
            this.apiKey = response.apiKey;
            this.profileSummary.apiKey = response.apiKey;
            this.appService.openSnackBar(response.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success)
          } else {
            this.appService.openSnackBar(response.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success)
          }
        },
        error: (_: Error) => {
          this.keyGenerating = false;
          let ops = this.profileSummary.apiKey ? OperationTypeEnum.reGenerate : OperationTypeEnum.generate;
          this.appService.openSnackBar(getGenericErrorMessage(ops), SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
        }
      })
  }

  getGenderColor(gender: GenderEnum): string {
    switch(gender){
      case GenderEnum.Female:
        return 'female-theme';
      case GenderEnum.Male:
        return 'male-theme';
      case GenderEnum.NotSpecified:
        return 'not-specified-theme';
    }
  }
}