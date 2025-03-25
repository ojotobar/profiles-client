import { Component, inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AlertComponent } from '../../common/alert/alert.component';
import { FieldErrorsDirective } from '../../directives/field-errors.directive';
import { AlertModel } from '../../models/common/alert-models';
import { ApiService } from '../../services/api.service';
import { ExperienceService } from '../../services/experience.service';
import { AppService } from '../../services/app.service';
import { ExperienceResultModel } from '../../models/experience/experience-models';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertClassEnum, AlertIconEnum } from '../../enums/alert-enums';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CountryModel } from '../../models/location/country-models';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../enums/snackbar-enum';

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
                error.message, AlertIconEnum.danger, AlertClassEnum.danger)
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
        this.numberOfAllowedAcc -= accArray.length;
      });
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
