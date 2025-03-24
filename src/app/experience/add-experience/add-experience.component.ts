import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { ExperienceService } from '../../services/experience.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { CountryModel, StateModel } from '../../models/location/country-models';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FieldErrorsDirective } from '../../directives/field-errors.directive';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApiService } from '../../services/api.service';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../enums/snackbar-enum';
import { ExperienceModel } from '../../models/experience/experience-models';

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
    MatCheckboxModule
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

      let form = this.experienceForm.value;
      let singlePayoad: ExperienceModel = {
        organization: form.organizationName as string,
        title: form.jobTitle as string,
        startDate: new Date(form.startDate),
        endDate: form.endDate ? new Date(form.endDate) : null,
        summaries: form.accomplishments,
        location: {
          city: form.city as string,
          country: form.country as string
        }
      }

      payloads.push(singlePayoad)
      this.loading = true;
      this.xpService.addExperiencesObservable(payloads)
        .subscribe({
          next: (data: any) => {
            this.loading = (<boolean>data.loading)
            let result = data.data.addExperiences.experiencesPayload;
            let success = (<boolean>result.success)
            let message = (<string>result.message)
            if(success){
              this.appService.openSnackBar(message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
              this.goBack();
            } else{
              this.appService.openSnackBar(message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
            }
          },
          error: (error: Error) => {
            this.loading = false;
            this.appService.openSnackBar(error.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
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
