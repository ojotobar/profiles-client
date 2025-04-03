import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AppService } from '../../../services/app.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogData } from '../../../models/common/snackbar-model';
import { GenderEnum } from '../../../enums/gender-enum';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TitlecasedPipe } from '../../../pipes/titlecased.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AlertComponent } from '../../common/alert/alert.component';
import { AlertModel } from '../../../models/common/alert-models';
import { ProfileModel, ProfileUpdateModel } from '../../../models/profile/profile-models';
import { InlineBackComponent } from '../../common/inline-back/inline-back.component';
import { ProfileService } from '../../../services/profile.service';
import { GenericResponseModel, getGenericErrorMessage } from '../../../models/common/common-models';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';
import { AlertClassEnum, AlertIconEnum } from '../../../enums/alert-enums';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';

@Component({
  selector: 'app-update-profile-details',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    TitlecasedPipe,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinner,
    AlertComponent,
    InlineBackComponent
  ],
  templateUrl: './update-profile-details.component.html',
  styleUrl: './update-profile-details.component.scss'
})
export class UpdateProfileDetailsComponent {
  form!: FormGroup;
  genderOptions = Object.values(GenderEnum);
  loading: boolean = false;
  isBusy: boolean = false;
  profile!: ProfileModel;
  error!: Error;
  alert = new AlertModel()
  appService = inject(AppService);
  profileService = inject(ProfileService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData,
      public dialogRef: MatDialogRef<UpdateProfileDetailsComponent, any>,
      private readonly fb: FormBuilder){
        this.form = this.fb.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          otherName: [''],
          phone: ['', Validators.required],
          gender: [GenderEnum.NotSpecified, Validators.required]
        })
  }

  ngOnInit(){
    this.getProfile();
  }

  getProfile(){
    this.loading = true;
    this.profileService.getProfile()
      .valueChanges
      .subscribe({
        next: (data: any) => {
          this.loading = <boolean>data.loading;
          if(data.data){
            this.profile = <ProfileModel>data.data.profile;
            if(this.profile){
              this.form.patchValue({
                firstName: this.profile.firstName,
                lastName: this.profile.lastName,
                otherName: this.profile.otherName,
                phone: this.profile.phoneNumber,
                gender: this.profile.gender
              })
            }else {
              this.alert = this.appService.mapAlertMessage(this.alert, 'No record found', 
                'No record found for this profile',
                AlertIconEnum.danger, AlertClassEnum.danger)
            }
          }else {
            this.alert = this.appService.mapAlertMessage(this.alert, 'An error occurred', getGenericErrorMessage(OperationTypeEnum.get),
            AlertIconEnum.danger, AlertClassEnum.danger)
          }
        },
        error: (error: Error) => {
          this.loading = false;
          this.error = error;
          this.alert = this.appService.mapAlertMessage(this.alert, 'An error occurred', getGenericErrorMessage(OperationTypeEnum.get),
            AlertIconEnum.danger, AlertClassEnum.danger);
        }
      })
  }

  UpdateDetails() {
    if(this.form.valid){
      let payload = <ProfileUpdateModel>this.form.value;
      this.isBusy = true;
      this.profileService.updateProfileDetailsObservable(payload)
        .subscribe({
          next: (data: any) => {
            this.isBusy = <boolean>data.loading;
            let result = (<GenericResponseModel>data.data.updateProfileDetails).payload;
            if(result.success){
              this.appService.openSnackBar(result.message,
                SnackbarClassEnum.Success, SnackbarIconEnum.Success);
              this.data.refresh = true;
              this.appService.closeDialog(this.dialogRef, this.data);
            }else {
              this.appService.openSnackBar(result.message,
                SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
            }
          },
          error: (_: Error) => {
            this.isBusy = false;
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.update),
              SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
        })
    }
  }
}
