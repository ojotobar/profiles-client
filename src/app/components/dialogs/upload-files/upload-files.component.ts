import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GenericResponseModel, getGenericErrorMessage, MatDialogFileUploadData } from '../../../models/common/common-models';
import { AppService } from '../../../services/app.service';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { UploadProfilePhotoMutation, UploadResumeMutation } from '../../../services/mutations/profile-mutations';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { UploadTypeEnum } from '../../../enums/upload-types-enums';

@Component({
  selector: 'app-upload-files',
  imports: [
    MatButtonModule,
    MatProgressSpinner,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './upload-files.component.html',
  styleUrl: './upload-files.component.scss'
})
export class UploadFilesComponent {
  loading: boolean = false;
  acceptedFileTypes: string = '*/*'
  selectedFile: File | null = null;
  fileName: string = '';
  appService = inject(AppService)

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MatDialogFileUploadData, 
    public dialogRef: MatDialogRef<UploadFilesComponent>){
    this.acceptedFileTypes = data && data.accept ? data.accept : this.acceptedFileTypes;
  }

  onUpload() {
    if (this.selectedFile) {
      switch(this.data.type) {
        case UploadTypeEnum.ProfilePhoto:
          this.uploadProfilePhoto();
          break;
        case UploadTypeEnum.Resume:
          this.uploadResume();
          break;
        default:
          this.appService.openSnackBar('Invalid type type', SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          break;
      }
    } else {
      this.appService.openSnackBar('No file selected', SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
    }
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileName = this.selectedFile.name;
    }
  }

  //#region Upload Methods
  uploadProfilePhoto(){
    if(this.selectedFile){
      this.appService.uploadFileObservable(this.selectedFile, UploadProfilePhotoMutation)
        .subscribe({
          next: (data: any) => {
            this.loading = (<boolean>data.loading);
            let result = (<GenericResponseModel>data.data.uploadProfilePhoto).payload;
            if(result.success){
              this.data.refreshAfterClose = true;
              this.appService.openSnackBar(result.message, 
                  SnackbarClassEnum.Success, SnackbarIconEnum.Success)
              this.appService.closeFileDialog(this.dialogRef, this.data)
            } else {
              this.appService.openSnackBar(result.message, 
                SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
            }
          },
          error: (_: Error) => {
            console.log(_)
            this.loading = false;
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.upload),
                SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
        })
    }
  }

  uploadResume(){
    if(this.selectedFile){
      this.appService.uploadFileObservable(this.selectedFile, UploadResumeMutation)
        .subscribe({
          next: (data: any) => {
            this.loading = (<boolean>data.loading);
            let result = (<GenericResponseModel>data.data.uploadResume).payload;
            if(result.success){
              this.data.refreshAfterClose = true;
              this.appService.openSnackBar(result.message, 
                  SnackbarClassEnum.Success, SnackbarIconEnum.Success)
              this.appService.closeFileDialog(this.dialogRef, this.data)
            } else {
              this.appService.openSnackBar(result.message, 
                SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
            }
          },
          error: (_: Error) => {
            console.log(_)
            this.loading = false;
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.upload),
                SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
        })
    }
  }
  //#region 
}
