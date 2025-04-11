import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FieldErrorsDirective } from '../../../directives/field-errors.directive';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { ExperienceModel, getEducationPayload } from '../../../models/experience/experience-models';
import { CountryModel } from '../../../models/location/country-models';
import { ApiService } from '../../../services/api.service';
import { AppService } from '../../../services/app.service';
import { ExperienceService } from '../../../services/experience.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GenericResponseModel, getGenericErrorMessage } from '../../../models/common/common-models';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';

@Component({
  selector: 'app-add-experience',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatOptionModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    FieldErrorsDirective,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './add-experience.component.html',
  styleUrl: './add-experience.component.scss'
})
export class AddExperienceComponent {
  numberOfAllowedAcc: number = 5;
  startDateTime = new Date()
  endDateDisabled: boolean = false;
  loading: boolean = false;
  experienceForm: FormGroup;
  appService = inject(AppService);
  xpService = inject(ExperienceService);
  apiService = inject(ApiService)
  countries: CountryModel[] = [];
  isMaxAccReached: boolean = false;

  constructor(private readonly fb: FormBuilder){
    this.experienceForm = this.fb.group({
      organizationName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      startDate: [Date(), Validators.required],
      endDate: [],
      city: ['', Validators.required],
      country: ['', Validators.required],
      accomplishments: this.fb.array([])
    })
  }

  ngOnInit(){
    this.getCountries();
  }

  getCountries(){
    this.apiService.getCountries()
      .subscribe({
        next: (data: any) => {
          this.countries = (<CountryModel[]>data.Data);
        },
        error: (error: Error) => {
          this.appService.openSnackBar(error.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
        }
      })
  }

  ProcessAddExperience() {
    if(this.experienceForm.valid){
      let payloads: ExperienceModel[] = [];
      let singlePayoad = getEducationPayload(this.experienceForm.value);

      payloads.push(singlePayoad)
      this.loading = true;
      this.xpService.addExperiencesObservable(payloads)
        .subscribe({
          next: (data: any) => {
            this.loading = (<boolean>data.loading)
            let result = (<GenericResponseModel>data.data.addExperiences).payload;
            if(result.success){
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
              this.goBack();
            } else{
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
            }
          },
          error: (error: Error) => {
            this.loading = false;
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.add), 
              SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
        })
    }
  }

  goBack() {
    this.appService.goBack()
  }

  onCheckboxChange($event: any){
    this.endDateDisabled = $event.checked;
    this.experienceForm.patchValue({ endDate: null });
  }

  getAccomplishments(): FormArray {
    return this.experienceForm.get('accomplishments') as FormArray;
  }

  addAccomplishment(): void {
    if(this.numberOfAllowedAcc > 0){
      this.getAccomplishments().push(this.fb.control('', Validators.required));
      this.numberOfAllowedAcc -= 1;
    } else{
      this.isMaxAccReached = this.numberOfAllowedAcc <= 0;
    }
  }

  removeAccomplishment(accIndex: number): void {
    this.getAccomplishments().removeAt(accIndex);
    this.numberOfAllowedAcc += 1;
    this.isMaxAccReached = this.numberOfAllowedAcc <= 0;
  }
}
