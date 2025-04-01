import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { SnackbarClassEnum, SnackbarIconEnum } from "../../../enums/snackbar-enum";
import { MatDialogData } from "../../../models/common/snackbar-model";
import { EducationResult } from "../../../models/education/education-models";
import { AppService } from "../../../services/app.service";
import { EducationService } from "../../../services/education.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-delete-education',
  imports: [MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './delete-education.component.html',
  styleUrl: './delete-education.component.scss'
})
export class DeleteEducationComponent {
  loading: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData, 
    public dialogRef: MatDialogRef<DeleteEducationComponent>,
    private readonly educationService: EducationService,
    public readonly appService: AppService) {}

  deleteRecord(){
    if(this.data.id){
      this.loading = true;
      this.educationService.deleteEducationObservable(this.data.id)
        .subscribe({
          next: (data: any) => {
            this.loading = (<boolean>data.loading);
            let result = (<EducationResult>data.data.deleteEducation.educationResult);
            if(result.success){
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
              this.data.refresh = true;
              this.appService.closeDialog(this.dialogRef, this.data);
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
}
