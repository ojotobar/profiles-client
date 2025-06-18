import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../services/app.service';
import { CareerSummaryService } from '../../../services/career-summary.service';
import { GenericResponseModel, getGenericErrorMessage } from '../../../models/common/common-models';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { CareerSummaryResponseModel } from '../../../models/career-summary/career-summary-models';
import { AlertModel } from '../../../models/common/alert-models';
import { AlertClassEnum, AlertIconEnum } from '../../../enums/alert-enums';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FieldErrorsDirective } from '../../../directives/field-errors.directive';
import { AlertComponent } from '../../common/alert/alert.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-career-summary',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    FieldErrorsDirective,
    AlertComponent,
    MatProgressSpinner
  ],
  templateUrl: './edit-career-summary.component.html',
  styleUrl: './edit-career-summary.component.scss'
})
export class EditCareerSummaryComponent {
  loading: boolean = false;
  isBusy: boolean = false;
  id!: string | null;
  careerSummary!: CareerSummaryResponseModel;
  alertInputs = new AlertModel();
  editForm!: FormGroup;
  appService = inject(AppService);
  summaryService = inject(CareerSummaryService);

  constructor(private readonly aRoute: ActivatedRoute, private readonly fb: FormBuilder){
    this.aRoute.paramMap.subscribe(route => {
      this.id = route.get('id')
    })
  }

  ngOnInit(){
    this.getCareerSummaryById(this.id)
    this.editForm = this.fb.group({
      summary: ['', Validators.required],
      heading: ['', Validators.required]
    })
  }

  getCareerSummaryById(id: string | null) {
    if(id){
      this.loading = true;
      this.summaryService.getSummaryByIdObservable(id)
        .valueChanges
        .subscribe({
          next: (data: any) => {
            this.loading = (<boolean>data.loading);
            this.careerSummary = (<CareerSummaryResponseModel>data.data.professionalSummaryById);
            if(this.careerSummary){
              this.editForm.patchValue(this.careerSummary);
            }else {
              this.alertInputs = this.appService.mapAlertMessage(this.alertInputs,
                'Record not found', 'No record found with the provided id',
                AlertIconEnum.danger, AlertClassEnum.danger
              )
            }
          },
          error: (_: Error) => {
            this.loading = false;
            this.alertInputs = this.appService.mapAlertMessage(this.alertInputs,
              'Something went wrong', getGenericErrorMessage(OperationTypeEnum.get),
              AlertIconEnum.danger, AlertClassEnum.danger
            )
          }
        })
    }
  }

  ProcessEditSummary(){
    if(this.editForm.valid && this.id){
      this.isBusy = true;
      this.summaryService.updateSummaryObservable(this.id, this.editForm.value.summary as string, this.editForm.value.heading as string)
        .subscribe({
          next: (data: any) => {
            this.isBusy = (<boolean>data.loading);
            let result = (<GenericResponseModel>data.data.updateCareerSummary)
            if(result && result.payload){
              if(result.payload.success){
                this.appService.openSnackBar(result.payload.message,
                    SnackbarClassEnum.Success, SnackbarIconEnum.Success);

                this.appService.goBack();
              } else{
                this.appService.openSnackBar(result.payload.message,
                  SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
              }
            } else{
              this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.update),
                SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
            }
          },
          error: (_: Error) => {
            this.isBusy = false;
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.update),
                SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
          }
        })
    }
  }
}
