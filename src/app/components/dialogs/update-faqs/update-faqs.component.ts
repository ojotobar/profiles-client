import { Component, Inject, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FieldErrorsDirective } from '../../../directives/field-errors.directive';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from '../../../services/app.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogData } from '../../../models/common/snackbar-model';
import { MatButtonModule } from '@angular/material/button';
import { FaqsItemModel } from '../../../models/common/faqs-models';
import { AlertClassEnum, AlertIconEnum } from '../../../enums/alert-enums';
import { GenericResponseModel, getGenericErrorMessage } from '../../../models/common/common-models';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';
import { AlertModel } from '../../../models/common/alert-models';
import { AlertComponent } from '../../common/alert/alert.component';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';

@Component({
  selector: 'app-update-faqs',
  imports: [
    MatProgressSpinnerModule,
    MatInputModule,
    FieldErrorsDirective,
    ReactiveFormsModule,
    MatButtonModule,
    AlertComponent
  ],
  templateUrl: './update-faqs.component.html',
  styles: ``
})
export class UpdateFaqsComponent {
  loading: boolean = false;
  isBusy: boolean = false;
  faq!: FaqsItemModel;
  alert = new AlertModel();
  error!: Error;
  form!: FormGroup;
  appService = inject(AppService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData,
    public readonly dialogRef: MatDialogRef<UpdateFaqsComponent>,
    private readonly fb: FormBuilder){
      this.form = this.fb.group({
        title: ['', Validators.required],
        content: ['', Validators.required]
      });

      this.getFaq();
  }

  getFaq(){
    this.loading = true;
    this.appService.getFaqObservable(this.data.id)
      .valueChanges
      .subscribe({
        next: (data) => {
          this.loading = <boolean>data.loading;
          this.faq = <FaqsItemModel>data.data.faq;
          if(this.faq){
            this.form.patchValue(this.faq)
          }else{
            this.alert = this.appService.mapAlertMessage(this.alert, 'No record found',
              'No error found with the Id', AlertIconEnum.danger, AlertClassEnum.danger
            )
          }
        },
        error: (error: Error) => {
          this.loading = false;
          this.error = error;
          this.alert = this.appService.mapAlertMessage(this.alert, 'An error occurred',
            getGenericErrorMessage(OperationTypeEnum.get), AlertIconEnum.danger, AlertClassEnum.danger
          )
        }
      })
  }

  UpdateRecord(){
    if(this.data.id && this.form.valid){
      const data = this.form.value;
      const title = data.title as string;
      const content = data.content as string;
      this.isBusy = true;
      this.appService.updateFaqObservable(this.data.id, title, content)
        .subscribe({
          next: (data) => {
            this.isBusy = <boolean>data.loading;
            const result = (<GenericResponseModel>data.data.updateFaq).payload;
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
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.update), 
              SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
        })
    
    }
  }
}
