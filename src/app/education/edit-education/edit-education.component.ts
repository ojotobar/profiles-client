import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EducationModel, EducationPatchModel, EducationResultModel } from '../../models/education/education-models';
import { EducationService } from '../../services/education.service';
import { AppService } from '../../services/app.service';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../enums/snackbar-enum';
import { CountryDataModel, CountryModel, StateModel } from '../../models/location/country-models';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FieldErrorsDirective } from '../../directives/field-errors.directive';
import { EntityLocationModel } from '../../models/common/entity-location-model';
import { EducationLevelEnum } from '../../enums/education-level-enum';
import { AlertModel } from '../../models/common/alert-models';
import { AlertClassEnum, AlertIconEnum } from '../../enums/alert-enums';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AlertComponent } from '../../common/alert/alert.component';

@Component({
  selector: 'app-edit-education',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    FieldErrorsDirective,
    MatDatepickerModule,
    MatCheckbox,
    MatProgressSpinner,
    AlertComponent
  ],
  templateUrl: './edit-education.component.html',
  styleUrl: './edit-education.component.scss'
})
export class EditEducationComponent {
  readonly startDateTime = new Date();
  id: string | null = '';
  loading: boolean = false;
  isSaving: boolean = false;
  endDateDisabled: boolean = false;
  education: EducationResultModel | null = null;
  educationService = inject(EducationService);
  countries: CountryModel[] = [];
  states: StateModel[] = [];
  appService = inject(AppService);
  apiService = inject(ApiService);
  editEducationForm!: FormGroup;
  levelOptions = this.appService.getEducationLevelOptions();
  alertInputs = new AlertModel();

  constructor(private readonly aRoute: ActivatedRoute, private fb: FormBuilder){
    this.aRoute.paramMap.subscribe(p => {
      this.id = p.get('id')
    });
  }

  ngOnInit() {
    this.getEducationById(this.id);
    this.editEducationForm = this.fb.group({
      institutionName: ['', Validators.required],
      major: ['', Validators.required],
      level: [''],
      startDate: [Date(), Validators.required],
      endDate: [Date()],
      city: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      longitude: [''],
      latitude: [''],
      isEndDateNull: [false]
    })
    this.fetchCountries();
  }

  ProcessEditEducation() {
    if(this.editEducationForm.valid && this.id){
      let form = this.editEducationForm.value;
      let location: EntityLocationModel = {
        city: form.city as string,
        state: form.state as string,
        country: form.country as string,
        latitude: form.latitude as string,
        longitude: form.longitude as string
      }
      
      let payload: EducationModel = {
        schoolName: form.institutionName as string,
        course: form.major as string,
        startDate: form.startDate ? new Date(form.startDate) : new Date(),
        endDate: form.endDate && !this.endDateDisabled ? new Date(form.endDate) : null,
        level: form.level as EducationLevelEnum,
        location: location
      }

      this.isSaving = true;
      this.educationService.updateEducationObservable(this.id, payload)
        .subscribe({
          next: (data: any) => {
            this.isSaving = (<boolean>data.loading);
            let result = data.data.updateEducation.educationResult;
            let success = (<boolean>result.success);
            let message = (<string>result.message);
            if(success){
              this.appService.openSnackBar(message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
              this.appService.goBack()
            }else {
              this.appService.openSnackBar(message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
            }
          },
          error: (error: Error) => {
            this.isSaving = false;
            this.appService.openSnackBar(error.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
          }
        })
    }
  }

  getEducationById(id: string | null){
    if(id){
      this.loading = true;
      this.educationService.getEducationByIdObservable(id)
        .valueChanges
        .subscribe({
          next: (data: any) => {
            this.loading = (<boolean>data.loading);
            this.education = (<EducationResultModel>data.data.education);
            if(this.education){
              this.endDateDisabled = this.education.endDate === null;
              this.editEducationForm.patchValue(this.PatchValues(this.education))
            } else{
              this.alertInputs = this.appService.mapAlertMessage(this.alertInputs,
                'An error occurred!', 'An error occurred why getting the data. Please try again later.', 
                AlertIconEnum.danger, AlertClassEnum.danger
              )
            }
          },
          error: (error: Error) => {
            this.loading = false;
            this.alertInputs = this.appService.mapAlertMessage(this.alertInputs,
              'An error occurred!', 'An error occurred why getting the data. Please try again later.', 
              AlertIconEnum.danger, AlertClassEnum.danger
            )
            this.appService.openSnackBar(error.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
      });
    }
  }

  fetchCountries() {
      this.apiService.getCountries().subscribe({
        next: (data: CountryDataModel) => {
          this.countries = data.Data;
          if(this.education){
            let countryName = this.education.location.country;
            let country = this.countries.find(c => c.Name === countryName);
            if(country){
              this.fetchStates(country.Id)
            }
          }
        },
        error: (error: Error) => {
          this.appService.openSnackBar(error.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
        }
      });
  }
  
  fetchStates(countryId: string) {
    this.apiService.getCountryStates(countryId).subscribe({
      next: (data: StateModel[]) => {
        this.states = data;
      },
      error: (error: Error) => {
        this.appService.openSnackBar(error.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
      }
    });
  }

  onCheckboxChange(event: any) {
    this.endDateDisabled = event.checked;
    this.editEducationForm.patchValue({ endDate: null });
  }

  onCountrySelectionChange(event: any) {
    const selectedCountry = this.countries.find(c => c.Name === event.value);
    if(selectedCountry){
      this.fetchStates(selectedCountry.Id)
    }
  }

  onStateSelectionChange(event: any) {
    const selectedState = this.states.find(c => c.Name === event.value);
    if(selectedState){
      this.editEducationForm.value.latitude = selectedState.Latitude;
      this.editEducationForm.value.longitude = selectedState.Longitude;
    }
  }

  goBack(){
    this.appService.goBack()
  }

  PatchValues(data: EducationResultModel): EducationPatchModel {
    let result: EducationPatchModel = {
      institutionName: data.institutionName,
      major: data.major,
      level: data.level,
      startDate: data.startDate,
      endDate: data.endDate,
      city: data.location?.city,
      state: data.location?.state,
      country: data.location?.country,
      latitude: data.location?.latitude,
      longitude: data.location?.longitude,
      isEndDateNull: data.endDate === null
    }

    return result;
  }
}
