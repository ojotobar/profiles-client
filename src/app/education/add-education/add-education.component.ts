import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FieldErrorsDirective } from '../../directives/field-errors.directive';
import { EducationLevelEnum } from '../../enums/education-level-enum';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { AppService } from '../../services/app.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { ApiService } from '../../services/api.service';
import { CountryDataModel, CountryModel, StateModel } from '../../models/location/country-models';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../enums/snackbar-enum';
import { EducationModel } from '../../models/education/education-models';
import { EntityLocationModel } from '../../models/common/entity-location-model';
import { EducationService } from '../../services/education.service';

@Component({
  selector: 'app-add-education',
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
    MatCheckbox
  ],
  templateUrl: './add-education.component.html',
  styleUrl: './add-education.component.scss'
})
export class AddEducationComponent {
  readonly startDateTime = new Date();
  readonly appService = inject(AppService);
  readonly apiService = inject(ApiService);
  readonly educationService = inject(EducationService)
  endDateDisabled: boolean = false;
  levelOptions = this.appService.getEducationLevelOptions();
  countries: CountryModel[] = [];
  states: StateModel[] = [];

  ngOnInit() {
    this.fetchCountries();
  }

  addEducationForm = new FormGroup({
    schoolName: new FormControl('', Validators.required),
    course: new FormControl('', Validators.required),
    level: new FormControl(EducationLevelEnum.Other),
    startDate: new FormControl(Date(), Validators.required),
    endDate: new FormControl(),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    longitude: new FormControl(''),
    latitude: new FormControl('')
  });

  ProcessAddEducation() {
    if(this.addEducationForm.valid){
      let form = this.addEducationForm.value;

      let location: EntityLocationModel = {
        city: form.city as string,
        state: form.state as string,
        country: form.country as string,
        latitude: form.latitude as string,
        longitude: form.longitude as string
      }
      let payload: EducationModel = {
        schoolName: form.schoolName as string,
        course: form.course as string,
        startDate: form.startDate ? new Date(form.startDate) : new Date(),
        endDate: form.endDate ? new Date(form.endDate) : null,
        level: form.level as EducationLevelEnum,
        location: location
      }
      this.educationService.addEducation(payload)
    }
  }

  goBack() {
    this.appService.goBack();
  }

  onCheckboxChange(event: any) {
    this.endDateDisabled = event.checked;
    this.addEducationForm.value.endDate = null;
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
      this.addEducationForm.value.latitude = selectedState.Latitude;
      this.addEducationForm.value.longitude = selectedState.Longitude;
    }
  }

  fetchCountries() {
    this.apiService.getCountries().subscribe({
      next: (data: CountryDataModel) => {
        this.countries = data.Data;
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
}
