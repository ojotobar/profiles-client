import { Component, inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckbox } from "@angular/material/checkbox";
import { provideNativeDateAdapter, MatOptionModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectChange, MatSelectModule } from "@angular/material/select";
import { FieldErrorsDirective } from "../../../directives/field-errors.directive";
import { EducationLevelEnum } from "../../../enums/education-level-enum";
import { SnackbarClassEnum, SnackbarIconEnum } from "../../../enums/snackbar-enum";
import { EntityLocationModel } from "../../../models/common/entity-location-model";
import { EducationModel } from "../../../models/education/education-models";
import { CountryModel, StateModel, CountryDataModel } from "../../../models/location/country-models";
import { ApiService } from "../../../services/api.service";
import { AppService } from "../../../services/app.service";
import { EducationService } from "../../../services/education.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { GenericResponseModel, getGenericErrorMessage } from "../../../models/common/common-models";
import { OperationTypeEnum } from "../../../enums/operation-type-enum";
import { TitlecasedPipe } from "../../../pipes/titlecased.pipe";

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
    MatCheckbox,
    MatProgressSpinnerModule,
    TitlecasedPipe
  ],
  templateUrl: './add-education.component.html',
  styleUrl: './add-education.component.scss'
})
export class AddEducationComponent {
  readonly startDateTime = new Date();
  readonly appService = inject(AppService);
  readonly apiService = inject(ApiService);
  readonly educationService = inject(EducationService)
  loading: boolean = false;
  showOtherForm: boolean = false;
  endDateDisabled: boolean = false;
  levelOptions= Object.values(EducationLevelEnum);
  countries: CountryModel[] = [];
  states: StateModel[] = [];

  ngOnInit() {
    this.fetchCountries();

    this.addEducationForm.get('level')?.valueChanges.subscribe(value => {
      this.toggleCustomLevel(value as EducationLevelEnum);
    });
  }

  addEducationForm = new FormGroup({
    schoolName: new FormControl('', Validators.required),
    course: new FormControl('', Validators.required),
    level: new FormControl(),
    startDate: new FormControl(Date(), Validators.required),
    endDate: new FormControl(),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    longitude: new FormControl(''),
    latitude: new FormControl(''),
    otherLevelSpecification: new FormControl('')
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
        location: location,
        otherLevelSpecification: form.otherLevelSpecification as string | null
      }

      this.loading = true;
      this.educationService.addEducation(payload)
        .subscribe({
          next: (data: any) => {
            this.loading = (<boolean>data.loading);
            let result = (<GenericResponseModel>data.data.addEducation).payload;
            if(result.success){
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
              this.appService.goBack()
            }else {
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
            }
          },
          error: (error: Error) => {
            this.loading = false;
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.add), SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
        });
    }
  }

  goBack() {
    this.appService.goBack();
  }

  onCheckboxChange(event: any) {
    this.endDateDisabled = event.checked;
    this.addEducationForm.patchValue({ endDate: null });
  }

  onCountrySelectionChange(event: any) {
    const selectedCountry = this.countries.find(c => c.Name === event.value);
    if(selectedCountry){
      this.fetchStates(selectedCountry.Id)
    }
  }

  onLevelSelected(event: MatSelectChange) {
    const selectedValue = event.value as EducationLevelEnum;
    this.toggleCustomLevel(selectedValue);
  }

  toggleCustomLevel(value: EducationLevelEnum) {
    this.showOtherForm = value === EducationLevelEnum.Other;
    const customLevelControl = this.addEducationForm.get('otherLevelSpecification');

    if (this.showOtherForm) {
      customLevelControl?.setValidators([Validators.required]);
    } else {
      customLevelControl?.clearValidators();
      customLevelControl?.setValue('');
    }

    customLevelControl?.updateValueAndValidity();
  }

  onStateSelectionChange(event: any) {
    const selectedState = this.states.find(c => c.Name === event.value);
    if(selectedState){
      this.addEducationForm.patchValue({ latitude: selectedState.Latitude, longitude: selectedState.Longitude });
    }
  }

  fetchCountries() {
    this.apiService.getCountries().subscribe({
      next: (data: CountryDataModel) => {
        this.countries = data.Data;
      },
      error: (error: Error) => {
        this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.getMany), SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
      }
    });
  }

  fetchStates(countryId: string) {
    this.apiService.getCountryStates(countryId).subscribe({
      next: (data: StateModel[]) => {
        this.states = data;
      },
      error: (error: Error) => {
        this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.getMany), SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
      }
    });
  }
}
