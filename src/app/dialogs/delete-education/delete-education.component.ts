import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogData } from '../../models/common/snackbar-model';
import { EducationService } from '../../services/education.service';
import { AppService } from '../../services/app.service';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../enums/snackbar-enum';
import { EducationResult } from '../../models/education/education-models';

@Component({
  selector: 'app-delete-education',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './delete-education.component.html',
  styleUrl: './delete-education.component.scss'
})
export class DeleteEducationComponent {
  loading: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData, 
    private dialogRef: MatDialogRef<DeleteEducationComponent>,
    private readonly educationService: EducationService,
    private readonly appService: AppService) {}

  deleteRecord(){
    this.loading = true;
    if(this.data.id){
      this.educationService.deleteEducationObservable(this.data.id)
        .subscribe({
          next: (data: any) => {
            this.loading = (<boolean>data.loading);
            let result = (<EducationResult>data.data.deleteEducation.educationResult);
            console.log(result, this.loading)
            if(result.success){
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
              this.data.refresh = true;
              this.closeDialog();
            } else{
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
            }
          },
          error: (error: Error) => {
            this.loading = false;
            this.appService.openSnackBar(error.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
        })
    }
  }

  closeDialog() {
    this.dialogRef.close(this.data);
  }
}
