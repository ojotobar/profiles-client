import { Component, inject } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { CareerSummaryService } from '../../../services/career-summary.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FieldErrorsDirective } from '../../../directives/field-errors.directive';
import { GenericResponseModel, getGenericErrorMessage } from '../../../models/common/common-models';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-career-summary',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FieldErrorsDirective,
    MatProgressSpinnerModule
  ],
  templateUrl: './add-career-summary.component.html',
  styleUrl: './add-career-summary.component.scss'
})
export class AddCareerSummaryComponent {
  loading: boolean = false;
  addForm!: FormGroup;
  appService = inject(AppService);
  summaryService = inject(CareerSummaryService)

  constructor(private readonly fb: FormBuilder){
    this.addForm = this.fb.group({
      summary: ['', Validators.required]
    })
  }

  ProcessAddSummary(){
    if(this.addForm.valid){
      this.loading = true;

      this.summaryService.addSummaryObservable(this.addForm.value.summary as string)
        .subscribe({
          next: (data: any) => {
            this.loading = (<boolean>data.loading);
            let res = (<GenericResponseModel>data.data.addProfessionalSummary);
            if(res && res.payload){
              if(res.payload.success){
                this.appService.openSnackBar(res.payload.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
                this.appService.goBack();
              } else {
                this.appService.openSnackBar(res.payload.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
              }
            } else {
              this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.add), SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
            }
          },
          error: (_: Error) => {
            this.loading = false;
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.add), SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
          }
        })
    }
  }
}
