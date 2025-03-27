import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogData } from '../../../models/common/snackbar-model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProjectService } from '../../../services/project.service';
import { AppService } from '../../../services/app.service';
import { getGenericErrorMessage, ResponseModel } from '../../../models/common/common-models';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';

@Component({
  selector: 'app-delete-project',
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './delete-project.component.html',
  styleUrl: './delete-project.component.scss'
})
export class DeleteProjectComponent {
  loading: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData,
      public dialogRef: MatDialogRef<DeleteProjectComponent>,
      private readonly projectService: ProjectService,
      public readonly appService: AppService){

  }

  deleteRecord(){
    this.loading = true;
    this.projectService.deleteProjectObservable(this.data.id)
      .subscribe({
        next: (data: any) => {
          this.loading = (<boolean>data.loading);
          let result = data.data;
          if(result){
            let res = (<ResponseModel>result.deleteProject.projectPayload);
            if(res && res.success){
              this.data.refresh = true;
              this.appService.closeDialog(this.dialogRef, this.data);
              this.appService.openSnackBar(res.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success)
            } else{
              this.appService.openSnackBar(res.message, 
                SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
            }
          }
          else {
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.delete), 
                SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
        },
        error: (_: Error) => {
          this.loading = false;
          this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.delete), 
                SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
        }
      })
  }
}
