import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { AlertComponent } from '../../common/alert/alert.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FieldErrorsDirective } from '../../../directives/field-errors.directive';
import { AlertIconEnum, AlertClassEnum } from '../../../enums/alert-enums';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { CertificationResultModel, CertificationModel } from '../../../models/certifications/certifications-models';
import { AlertModel } from '../../../models/common/alert-models';
import { getGenericErrorMessage, ResponseModel } from '../../../models/common/common-models';
import { AppService } from '../../../services/app.service';
import { CertificationsService } from '../../../services/certifications.service';

@Component({
  selector: 'app-edit-certitication',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    FieldErrorsDirective,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    AlertComponent,
    MatProgressSpinner
  ],
  templateUrl: './edit-certitication.component.html',
  styleUrl: './edit-certitication.component.scss'
})
export class EditCertiticationComponent {
  id: string | null = '';
  isSaving: boolean = false;
  certification!: CertificationResultModel;
  alertInputs = new AlertModel('No record found', getGenericErrorMessage(OperationTypeEnum.get))
  startDateTime = new Date();
  editForm!: FormGroup; 
  loading: boolean = false;
  appService = inject(AppService);
  certService = inject(CertificationsService);

  constructor(private readonly aRoute: ActivatedRoute, private readonly fb: FormBuilder){
    this.aRoute.paramMap.subscribe(route => {
      this.id = route.get('id');
    })
  }

  ngOnInit(){
    this.getCertById(this.id)
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      institutionName: ['', Validators.required],
      date: [Date(), Validators.required],
      yearsOfValidity: [],
      link: []
    });
  }

  getCertById(id: string | null){
    if(id){
      this.loading = true;
      this.certService.getCertificationObservable(id)
        .valueChanges
        .subscribe({
          next: (data: any) => {
            this.loading = (<boolean>data.loading);
            this.certification = (<CertificationResultModel>data.data.certification);
            if(this.certification){
              this.editForm.patchValue(this.certification);
              this.editForm.patchValue(
                { 
                  institutionName: this.certification.institution, 
                  date: this.certification.dateObtained
                })
            }
          },
          error: (error: Error) => {
            this.alertInputs = this.appService.mapAlertMessage(this.alertInputs, 
              'Something went wrong', getGenericErrorMessage(OperationTypeEnum.get),
              AlertIconEnum.danger, AlertClassEnum.danger
            )
          }
        })
    }
  }

  ProcessUpdateCertification() {
    if(this.editForm.valid && this.id){
      this.isSaving = true;
      let form = this.editForm.value;
      
      let payload: CertificationModel = {
        name: form.name as string,
        institutionName: form.institutionName as string,
        date: new Date(form.date),
        yearsOfValidity: form.yearsOfValidity as number | null,
        link: form.link as string | null
      }
      this.certService.updateCertificationObservable(this.id, payload)
        .subscribe({
          next: (data: any) => {
            this.isSaving = (<boolean>data.loading)
            let result = (<ResponseModel>data.data.updateCertification.certificationPayload)
            if(result.success){
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
              this.goBack();
            } else{
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
            }
          },
          error: (error: Error) => {
            this.isSaving = false;
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.update), 
              SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
        })
    }
  }

  goBack() {
    this.appService.goBack()
  }
}
