import { Component, inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckbox } from "@angular/material/checkbox";
import { provideNativeDateAdapter, MatOptionModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatSelectChange, MatSelectModule } from "@angular/material/select";
import { ActivatedRoute } from "@angular/router";
import { FieldErrorsDirective } from "../../../directives/field-errors.directive";
import { AlertIconEnum, AlertClassEnum } from "../../../enums/alert-enums";
import { EducationLevelEnum } from "../../../enums/education-level-enum";
import { SnackbarClassEnum, SnackbarIconEnum } from "../../../enums/snackbar-enum";
import { AlertModel } from "../../../models/common/alert-models";
import { EntityLocationModel } from "../../../models/common/entity-location-model";
import { EducationResultModel, EducationModel, EducationPatchModel } from "../../../models/education/education-models";
import { CountryModel, StateModel, CountryDataModel } from "../../../models/location/country-models";
import { ApiService } from "../../../services/api.service";
import { AppService } from "../../../services/app.service";
import { EducationService } from "../../../services/education.service";
import { AlertComponent } from "../../common/alert/alert.component";
import { GenericResponseModel, getGenericErrorMessage } from "../../../models/common/common-models";
import { OperationTypeEnum } from "../../../enums/operation-type-enum";
import { TitlecasedPipe } from "../../../pipes/titlecased.pipe";

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
    AlertComponent,
    TitlecasedPipe
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
  levelOptions = Object.values(EducationLevelEnum);
  alertInputs = new AlertModel();
  showOtherForm: boolean = false;

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
      isEndDateNull: [false],
      otherLevelSpecification: [null]
    })
    this.fetchCountries();

    this.editEducationForm.get('level')?.valueChanges.subscribe(value => {
      this.toggleCustomLevel(value as EducationLevelEnum);
    });
  }

  toggleCustomLevel(value: EducationLevelEnum) {
    this.showOtherForm = value === EducationLevelEnum.Other;
    const customLevelControl = this.editEducationForm.get('otherLevelSpecification');

    if (this.showOtherForm) {
      customLevelControl?.setValidators([Validators.required]);
    } else {
      customLevelControl?.clearValidators();
      customLevelControl?.setValue('');
    }

    customLevelControl?.updateValueAndValidity();
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
        location: location,
        otherLevelSpecification: form.otherLevelSpecification as string | null
      }

      this.isSaving = true;
      this.educationService.updateEducationObservable(this.id, payload)
        .subscribe({
          next: (data: any) => {
            this.isSaving = (<boolean>data.loading);
            let result = (<GenericResponseModel>data.data.updateEducation).payload;
            if(result.success){
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
              this.appService.goBack()
            }else {
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
            }
          },
          error: (error: Error) => {
            this.isSaving = false;
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.update), SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
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
            this.education = (<EducationResultModel>data.data.education);
            if(this.education){
              this.endDateDisabled = this.education.endDate === null;
              this.showOtherForm = this.education.level === EducationLevelEnum.Other;
              this.fetchCountries();
              this.editEducationForm.patchValue(this.PatchValues(this.education))

            } else{
              this.alertInputs = this.appService.mapAlertMessage(this.alertInputs,
                'An error occurred!', 'An error occurred why getting the data. Please try again later.', 
                AlertIconEnum.danger, AlertClassEnum.danger
              )
            }

            this.loading = false;
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

  onLevelSelected(event: MatSelectChange) {
    const selectedValue = event.value as EducationLevelEnum;
    this.toggleCustomLevel(selectedValue);
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
      isEndDateNull: data.endDate === null,
      otherLevelSpecification: data.otherLevelSpecification
    }

    return result;
  }
}
