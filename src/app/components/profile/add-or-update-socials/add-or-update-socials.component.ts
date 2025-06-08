import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SocialMediaEnum } from '../../../enums/social-media-enum';
import { SocialMediaModel, SocialMediaResponseModel } from '../../../models/profile/profile-models';
import { ProfileService } from '../../../services/profile.service';
import { GenericResponseModel, getGenericErrorMessage } from '../../../models/common/common-models';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';
import { AlertClassEnum, AlertIconEnum } from '../../../enums/alert-enums';
import { AlertModel } from '../../../models/common/alert-models';
import { AppService } from '../../../services/app.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { TitlecasedPipe } from '../../../pipes/titlecased.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { AlertComponent } from '../../common/alert/alert.component';

@Component({
  selector: 'app-add-or-update-socials',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    TitlecasedPipe,
    MatProgressSpinnerModule,
    MatInputModule,
    AlertComponent
  ],
  templateUrl: './add-or-update-socials.component.html',
  styleUrl: './add-or-update-socials.component.scss'
})
export class AddOrUpdateSocialsComponent implements OnInit {
  loading: boolean = false;
  isBusy: boolean = false;
  hasError: boolean = false;
  alert = new AlertModel();
  existing: SocialMediaModel[] = [];
  addOrUpdateSocialMediaForm!: FormGroup;
  socialMediaTypes = Object.values(SocialMediaEnum);

  constructor(private fb: FormBuilder, 
    private profileSvc: ProfileService, public appSvc: AppService) {}

  ngOnInit(): void {
    this.addOrUpdateSocialMediaForm = this.fb.group({
      socialMedia: this.fb.array([]),
    });
    this.getSocialMedia();
  }

  get socialMediaArray(): FormArray {
    return this.addOrUpdateSocialMediaForm.get('socialMedia') as FormArray;
  }

  createSocialMediaFormGroup(sm: SocialMediaModel): FormGroup {
    return this.fb.group({
      type: [sm.type, Validators.required],
      iconName: [sm.iconName],
      link: [sm.link, [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
    });
  }

  addOrUpdateSocialMedia(newSM: SocialMediaModel): void {
    const existingIndex = this.socialMediaArray.controls.findIndex(
      control => control.get('type')?.value === newSM.type
    );

    if (existingIndex >= 0) {
      // Update existing
      this.socialMediaArray.at(existingIndex).patchValue(newSM);
    } else {
      // Add new
      this.socialMediaArray.push(this.createSocialMediaFormGroup(newSM));
    }
  }

  addEmpty(): void {
    this.socialMediaArray.push(this.createSocialMediaFormGroup({ type: '' as SocialMediaEnum, link: '', iconName: '' } as SocialMediaModel));
  }

  remove(index: number): void {
    this.socialMediaArray.removeAt(index);
  }

  onSubmit(): void {
    const result = this.addOrUpdateSocialMediaForm.value.socialMedia as SocialMediaModel[];
    if(result){
      this.isBusy = true;
      this.profileSvc.addOrUpdateSMObservable(result)
        .subscribe({
          next: (data: any) => {
            this.isBusy = (<boolean>data.loading);
            let result = (<GenericResponseModel>data.data.addOrUpdateSocialMedia).payload;
            if(result.success){
              this.appSvc.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
              this.appSvc.goBack()
            }else {
              this.appSvc.openSnackBar(result.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
            }
          },
          error: (error: Error) => {
            this.isBusy = false;
            this.appSvc.openSnackBar(getGenericErrorMessage(OperationTypeEnum.update), SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
          }
        })
    }else{
      this.appSvc.openSnackBar('Invalid inputs. Please try again!', SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
    }
  }

  getSocialMedia() {
    this.loading = true;
    this.profileSvc.getSocialMediaObservable()
      .valueChanges
      .subscribe({
        next: (data: any) => {
          this.loading = <boolean>(data.loading);
          var result = <SocialMediaResponseModel>(data.data)
          if(result.socialMedia.success){
            this.existing = result.socialMedia.socialMedia;
            this.existing.forEach(sm => this.addOrUpdateSocialMedia(sm));
          }else{
            this.hasError = true;
            this.alert = this.appSvc.mapAlertMessage(this.alert, 'An error occurred',
                getGenericErrorMessage(OperationTypeEnum.get), AlertIconEnum.danger, AlertClassEnum.danger)
          }

          this.loading = false;
        },
        error: (e: Error) => {
          this.hasError = true;
          this.loading = false;
            this.alert = this.appSvc.mapAlertMessage(this.alert, 'An error occurred',
                getGenericErrorMessage(OperationTypeEnum.get), AlertIconEnum.danger, AlertClassEnum.danger)
        }
      })
  }

  onTypeSelected(event: MatSelectChange, $index: number) {
    const selectedValue = event.value as SocialMediaEnum;
    this.prefillLinkAndIconName(this.getSMBaseUrl(selectedValue), this.getSMIconName(selectedValue), $index);
  }

  prefillLinkAndIconName(prefix: string, iconName: string, activeIndex: number) {
    const formArray = this.addOrUpdateSocialMediaForm.get('socialMedia') as FormArray;
    const activeControl = formArray.at(activeIndex); // you'd need to set this index based on context
    if (activeControl) {
      activeControl.get('link')?.setValue(prefix);
      activeControl.get('iconName')?.setValue(iconName);
    }
  }

  getSMBaseUrl(type: SocialMediaEnum): string {
    switch(type){
      case SocialMediaEnum.Facebook:
        return 'https://facebook.com/';
      case SocialMediaEnum.GitHub:
        return 'https://github.com/';
      case SocialMediaEnum.GitLab:
        return 'https://gitlab.com/';
      case SocialMediaEnum.Instagram:
        return 'https://instagram.com/';
      case SocialMediaEnum.LinkedIn:
        return 'https://linkedin.com/';
      case SocialMediaEnum.X:
        return 'https://x.com/';
      default:
        return '';
    }
  }

  getSMIconName(type: SocialMediaEnum): string {
    switch(type){
      case SocialMediaEnum.Facebook:
        return 'facebook';
      case SocialMediaEnum.GitHub:
        return 'github';
      case SocialMediaEnum.GitLab:
        return 'gitlab';
      case SocialMediaEnum.Instagram:
        return 'instagram';
      case SocialMediaEnum.LinkedIn:
        return 'linkedin';
      case SocialMediaEnum.X:
        return 'x-lg';
      default:
        return '';
    }
  }
}
