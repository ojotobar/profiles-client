import { Component, inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { provideNativeDateAdapter, MatOptionModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { ActivatedRoute } from "@angular/router";
import { FieldErrorsDirective } from "../../../directives/field-errors.directive";
import { AlertIconEnum, AlertClassEnum } from "../../../enums/alert-enums";
import { SnackbarClassEnum, SnackbarIconEnum } from "../../../enums/snackbar-enum";
import { AlertModel } from "../../../models/common/alert-models";
import { getGenericErrorMessage, ResponseModel } from "../../../models/common/common-models";
import { ExperienceResultModel, getEducationPayload } from "../../../models/experience/experience-models";
import { CountryModel } from "../../../models/location/country-models";
import { ApiService } from "../../../services/api.service";
import { AppService } from "../../../services/app.service";
import { ExperienceService } from "../../../services/experience.service";
import { AlertComponent } from "../../common/alert/alert.component";
import { OperationTypeEnum } from "../../../enums/operation-type-enum";

@Component({
  selector: 'app-edit-experience',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatProgressSpinner,
    MatInputModule,
    FieldErrorsDirective,
    AlertComponent,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './edit-experience.component.html',
  styleUrl: './edit-experience.component.scss'
})
export class EditExperienceComponent {
  loading: boolean = false;
  startDateTime: Date = new Date();
  experience: ExperienceResultModel | null = null;
  alertInputs = new AlertModel();
  apiService = inject(ApiService);
  xpService = inject(ExperienceService);
  appService = inject(AppService);
  id: string | null = '';
  isSaving: boolean = false;
  experienceForm!: FormGroup;
  endDateDisabled: boolean = false;
  numberOfAllowedAcc: number = 5;
  isMaxAccReached: boolean = false;
  countries: CountryModel[] = [];

  constructor(private readonly aRoute: ActivatedRoute, private readonly fb: FormBuilder){
    this.aRoute.paramMap.subscribe(route => {
      this.id = route.get('id')
    })
  }

  ngOnInit(){
    this.getExperienceById(this.id);
    this.experienceForm = this.fb.group({
      organizationName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      startDate: [Date(), Validators.required],
      endDate: [],
      city: ['', Validators.required],
      country: ['', Validators.required],
      accomplishments: this.fb.array([]),
      isEndDateNull: [false]
    });

    this.getCountries();
  }

  ProcessUpdateExperience() {
    if(this.experienceForm.valid && this.id){
      let payload = getEducationPayload(this.experienceForm.value);

      this.isSaving = true;
      this.xpService.updateExperienceObservable(this.id, payload)
        .subscribe({
          next: (data: any) => {
            this.isSaving = (<boolean>data.loading);
            let result = <ResponseModel>data.data.updateExperience.payload;
            if(result.success){
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success)
              this.appService.goBack()
            } else {
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
            }
          },
          error: (error: Error) => {
            this.isSaving = false;
            this.appService.openSnackBar('An error occurred while updating the record. Please try again', 
              SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
        })
    }
  }

  getExperienceById(id: string | null){
    if(id){
      this.loading = true;
      this.xpService.getObservableExperienceById(id)
        .valueChanges
        .subscribe({
          next: (data: any) => {
            this.loading = (<boolean>data.loading)
            this.experience = (<ExperienceResultModel>data.data.experience)
            if(this.experience){
              this.endDateDisabled = this.experience.endDate === null;
              this.endDateDisabled = this.experience.endDate === null;
              this.PatchValues(this.experience)
            } else {
              this.alertInputs = this.appService.mapAlertMessage(this.alertInputs, 'No record found',
                `No employemnt history found with the Id ${this.id}`, AlertIconEnum.danger, AlertClassEnum.danger)
            }
          },
          error: (error: Error) => {
            this.loading = false;
            this.alertInputs = this.appService.mapAlertMessage(this.alertInputs, 'An error occurred',
                getGenericErrorMessage(OperationTypeEnum.get), AlertIconEnum.danger, AlertClassEnum.danger)
          }
        })
    }
  }

  onCheckboxChange($event: any){
    this.endDateDisabled = $event.checked;
    this.experienceForm.patchValue({ endDate: null });
  }

  // addAccomplishment(): void {
  //   if(this.numberOfAllowedAcc > 0){
  //     this.appService.getForms(this.experienceForm, 'accomplishments');
  //     this.numberOfAllowedAcc -= 1;
  //   } else{
  //     this.isMaxAccReached = this.numberOfAllowedAcc <= 0;
  //   }
  // }

  addAccomplishment(): void {
    if(this.numberOfAllowedAcc > 0){
      this.getAccomplishments().push(this.fb.control('', Validators.required));
      this.numberOfAllowedAcc -= 1;
    } else{
      this.isMaxAccReached = this.numberOfAllowedAcc <= 0;
    }
  }

  getAccomplishments(): FormArray {
    return this.experienceForm.get('accomplishments') as FormArray;
  }
  
  removeAccomplishment(accIndex: number): void {
    this.appService.getForms(this.experienceForm, 'accomplishments').removeAt(accIndex);
    this.numberOfAllowedAcc += 1;
    this.isMaxAccReached = this.numberOfAllowedAcc <= 0;
  }

  PatchValues(data: ExperienceResultModel) {
    this.experienceForm.patchValue(data);
    this.experienceForm.patchValue({ organizationName: data.organization })
    this.experienceForm.patchValue({ city: data.location.city })
    this.experienceForm.patchValue({ country: data.location.country })
    this.experienceForm.patchValue({ isEndDateNull: data.endDate === null })

    const accomplishmentsArray = this.experienceForm.get('accomplishments') as FormArray;
    accomplishmentsArray.clear(); // Clear existing data before patching
    
    if (data.accomplishments && Array.isArray(data.accomplishments)) {
      const accArray = data.accomplishments.length > this.numberOfAllowedAcc ? 
        data.accomplishments.slice(0, this.numberOfAllowedAcc) :
        data.accomplishments;
      
        accArray.forEach((acc) => {
          accomplishmentsArray.push(this.fb.control(acc));
        });

        this.numberOfAllowedAcc -= accArray.length;
    }
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
}
