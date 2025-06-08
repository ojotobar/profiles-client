import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from '../../../services/app.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CountryDataModel, CountryModel, StateModel } from '../../../models/location/country-models';
import { GenericResponseModel, getGenericErrorMessage } from '../../../models/common/common-models';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { ApiService } from '../../../services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogData } from '../../../models/common/snackbar-model';
import { MatButtonModule } from '@angular/material/button';
import { ProfileLocationModel, ProfileModel } from '../../../models/profile/profile-models';
import { AlertClassEnum, AlertIconEnum } from '../../../enums/alert-enums';
import { ProfileService } from '../../../services/profile.service';
import { AlertModel } from '../../../models/common/alert-models';
import { AlertComponent } from '../../common/alert/alert.component';

@Component({
  selector: 'app-location',
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressSpinner,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    AlertComponent
  ],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  loading: boolean = false;
  isBusy: boolean = false;
  locationForm!: FormGroup;
  countries: CountryModel[] = [];
  states: StateModel[] = [];
  profile!: ProfileModel;
  alert = new AlertModel();
  error!: Error;
  appService = inject(AppService);
  apiService = inject(ApiService);
  profileService = inject(ProfileService);

  constructor(public readonly fb: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: MatDialogData, 
    public dialogRef: MatDialogRef<LocationComponent>){
    this.locationForm = this.fb.group({
      line1: ['', Validators.required],
      line2: [''],
      city: ['', Validators.required],
      postalCode: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      state: ['', Validators.required],
      country: ['', Validators.required],
      longitude: [''],
      latitude: ['']
    })
  }

  ngOnInit(){
    if(!this.data.new){
      this.getProfile();
    }
  }

  AddOrUpdateLocation() {
    if(this.locationForm.valid){
      let payload = (<ProfileLocationModel>this.locationForm.value);
      
      this.isBusy = true;
      this.profileService.addOrUpdateLocationObservable(payload)
        .subscribe({
          next: (data: any) => {
            this.isBusy = (<boolean>data.loading);
            let response = (<GenericResponseModel>data.data.addOrUpdateUserLocation).payload;
            if(response.success){
              this.data.refresh = true;
              this.appService.openSnackBar(response.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
              this.appService.closeDialog(this.dialogRef, this.data)
            } else {
              this.appService.openSnackBar(response.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
            }
          },
          error: (_: Error) => {
            this.isBusy = false;
            this.appService.openSnackBar(getGenericErrorMessage(this.data.new ? OperationTypeEnum.add : OperationTypeEnum.update),
                SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
        })
    }
  }

  getProfile(){
      this.loading = true;
      this.profileService.getProfile()
        .valueChanges
        .subscribe({
          next: (data: any) => {
            this.profile = (<ProfileModel>data.data.profile);
            if(!this.profile){
              this.alert = this.appService.mapAlertMessage(this.alert,
                'No record', 'No record found for this profile. Please try again later',
                AlertIconEnum.danger, AlertClassEnum.danger)
            } else{
              if(this.profile.location){
                this.fetchCountries();
                this.locationForm.patchValue(this.profile.location);
              }
            }

            this.loading = false;
          },
          error: (error: Error) => {
            this.loading = false;
            this.error = error;
            this.alert = this.appService.mapAlertMessage(this.alert,
                'An error occurred', getGenericErrorMessage(OperationTypeEnum.get),
                AlertIconEnum.danger, AlertClassEnum.danger
            )
          }
        })
  }

  onCountrySelectionChange(event: any) {
    const selectedCountry = this.findCountry(event.value, this.countries);
    if(selectedCountry){
      this.fetchStates(selectedCountry.Id)
    }
  }

  onStateSelectionChange(event: any) {
    const selectedState = this.findState(event.value, this.states);
    if(selectedState){
      this.locationForm.patchValue({ latitude: selectedState.Latitude, longitude: selectedState.Longitude });
    }
  }

  findCountry(name: string, countries: CountryModel[]): CountryModel | undefined {
    return countries.find(c => c.Name === name);
  }

  findState(name: string, states: StateModel[]): StateModel | undefined {
    return states.find(c => c.Name === name);
  }

  fetchCountries() {
      this.apiService.getCountries().subscribe({
        next: (data: CountryDataModel) => {
          this.countries = data.Data;
          if(!this.data.new && this.profile && this.profile.location){
            let country = this.findCountry(this.profile.location?.country, this.countries);
            if(country){
              this.fetchStates(country.Id);          
            }        
          }
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
        if(this.states.length > 0 && !this.data.new && this.profile && this.profile.location){
          let state = this.findState(this.profile.location.state, this.states);
          if(state){
            this.locationForm.patchValue({ state: state.Name })
          }
        }
      },
      error: (error: Error) => {
        this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.getMany), 
            SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
      }
    });
  }
}
