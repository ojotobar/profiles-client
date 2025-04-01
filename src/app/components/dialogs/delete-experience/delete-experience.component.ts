import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { SnackbarClassEnum, SnackbarIconEnum } from "../../../enums/snackbar-enum";
import { ResponseModel } from "../../../models/common/common-models";
import { MatDialogData } from "../../../models/common/snackbar-model";
import { AppService } from "../../../services/app.service";
import { ExperienceService } from "../../../services/experience.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-delete-experience',
  imports: [MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './delete-experience.component.html',
  styleUrl: './delete-experience.component.scss'
})
export class DeleteExperienceComponent {
  loading: boolean = false;
  
    constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData, 
      public dialogRef: MatDialogRef<DeleteExperienceComponent>,
      private readonly xpService: ExperienceService,
      public readonly appService: AppService) {}
  
    deleteRecord(){
      this.loading = true;
      if(this.data.id){
        this.xpService.deleteExperienceObservable(this.data.id)
          .subscribe({
            next: (data: any) => {
              this.loading = (<boolean>data.loading);
              let result = (<ResponseModel>data.data.deleteExperience.experiencePayload);
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
