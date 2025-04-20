import { Component, Inject, inject } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { FieldErrorsDirective } from '../../../directives/field-errors.directive';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { content } from 'html2canvas/dist/types/css/property-descriptors/content';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogData } from '../../../models/common/snackbar-model';
import { GenericResponseModel, getGenericErrorMessage } from '../../../models/common/common-models';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';

@Component({
  selector: 'app-add-faqs',
  imports: [
    FieldErrorsDirective,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './add-faqs.component.html',
  styles: ``
})
export class AddFaqsComponent {
  isBusy: boolean = false;
  form!: FormGroup;
  appService = inject(AppService);
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData, 
      private readonly fb: FormBuilder, public readonly dialogRef: MatDialogRef<AddFaqsComponent>){
      this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    })
  }

  AddRecord(){
    if(this.form.valid){
      const data = this.form.value;
      const title = data.title as string;
      const content = data.content as string;
      this.isBusy = true;
      this.appService.addFaqObservable(title, content)
        .subscribe({
          next: (data) => {
            this.isBusy = <boolean>data.loading;
            const result = (<GenericResponseModel>data.data.addFaq).payload;
            if(result.success){
              this.data.refresh = true;
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
              this.appService.closeDialog(this.dialogRef, this.data)
            }else {
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
            }
          },
          error: (error: Error) => {
            this.isBusy = false;
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.add), 
              SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
        })
    
    }
  }
}