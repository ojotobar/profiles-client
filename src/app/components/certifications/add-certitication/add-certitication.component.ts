import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { CertificationModel } from '../../../models/certifications/certifications-models';
import { ResponseModel } from '../../../models/common/common-models';
import { AppService } from '../../../services/app.service';
import { CertificationsService } from '../../../services/certifications.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-certitication',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './add-certitication.component.html',
  styleUrl: './add-certitication.component.scss'
})
export class AddCertiticationComponent {
  loading: boolean = false;
  startDateTime: Date = new Date();
  certificationForm!: FormGroup;
  certService = inject(CertificationsService)
  appService = inject(AppService)

  constructor(private readonly fb: FormBuilder){
    this.certificationForm = this.fb.group({
      name: ['', Validators.required],
      institutionName: ['', Validators.required],
      date: [Date(), Validators.required],
      yearsOfValidity: [],
      link: []
    })
  }

  ProcessAddCertification() {
    if(this.certificationForm.valid){
      let form = this.certificationForm.value;
      let payload: CertificationModel = {
        name: form.name as string,
        institutionName: form.institutionName as string,
        date: new Date(form.date),
        yearsOfValidity: form.yearsOfValidity as number | null,
        link: form.link as string | null
      }

      let payloads: CertificationModel[] = [];
      payloads.push(payload)
      this.loading = true;
      this.certService.addCertificationsObservable(payloads)
        .subscribe({
          next: (data: any) => {
            this.loading = (<boolean>data.loading);
            let result = (<ResponseModel>data.data.addCertifications.payload);
            if(result.success){
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
              this.goBack()
            }else {
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
            }
          },
          error: (error:Error) => {
            this.loading = false;
            this.appService.openSnackBar('Something went wrong while saving the data. Please try again.', 
              SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
        })
    }
  }

  goBack() {
    this.appService.goBack();
  }
}
