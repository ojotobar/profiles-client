import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogData } from '../../../models/common/snackbar-model';
import { AppService } from '../../../services/app.service';
import { SkillService } from '../../../services/skill.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { GenericResponseModel, getGenericErrorMessage } from '../../../models/common/common-models';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';

@Component({
  selector: 'app-delete-skill',
  imports: [MatIconModule, MatButtonModule, MatProgressSpinner],
  templateUrl: './delete-skill.component.html',
  styleUrl: './delete-skill.component.scss'
})
export class DeleteSkillComponent {
  loading: boolean = false;
  appService = inject(AppService);
  skillService = inject(SkillService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData,
        public dialogRef: MatDialogRef<DeleteSkillComponent>){}

  deleteRecord(){
    if(this.data.id){
      this.loading = true;
      this.skillService.deleteSkillObservable(this.data.id)
        .subscribe({
          next: (data: any) => {
            this.loading = (<boolean>data.loading);
            let result = (<GenericResponseModel>data.data.deleteSkill);
            if(result && result.payload){
              if(result.payload.success){
                this.data.refresh = true;
                this.appService.openSnackBar(result.payload.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
                this.appService.closeDialog(this.dialogRef, this.data);
              } else {
                this.appService.openSnackBar(result.payload.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
              }
            } else {
              this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.delete), 
                SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
            }
          },
          error: (_: Error) => {
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.delete), 
                SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
          }
        })
    }
  }
}
