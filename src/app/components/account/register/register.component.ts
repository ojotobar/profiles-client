import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { FieldErrorsDirective } from '../../../directives/field-errors.directive';
import { GenderEnum } from '../../../enums/gender-enum';
import { RegisterModel } from '../../../models/account/register-model';
import { GenderOption } from '../../../models/profile/gender-option-model';
import { AccountService } from '../../../services/account.service';
import { AppService } from '../../../services/app.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GenericResponseModel } from '../../../models/common/common-models';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';

@Component({
  selector: 'app-register',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    RouterLink,
    MatCheckboxModule,
    FieldErrorsDirective,
    MatProgressSpinnerModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isHidden: boolean = true;
  loading: boolean = false;
  isTermAccepted: boolean = true;
  
  genderOptions: GenderOption[] = [
    { label: 'Not Specified', value: GenderEnum.NotSpecified },
    { label: 'Male', value: GenderEnum.Male },
    { label: 'Female', value: GenderEnum.Female }
  ]
  
  constructor(private accountService: AccountService,
    public appService: AppService, private readonly router: Router){
    this.accountService.hide
      .subscribe(h => this.isHidden = h);
  }

  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    middleName: new FormControl(''),
    emailAddress: new FormControl('', Validators.compose([Validators.email, Validators.required])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
    confirmPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
    phoneNumber: new FormControl('', Validators.required),
    gender: new FormControl(GenderEnum.NotSpecified),
    terms: new FormControl(false, Validators.requiredTrue)
  });

  ProcessRegistration(){
    if(this.registerForm.valid){
      if(this.registerForm.value.terms === true){
        this.isTermAccepted = true;
        let payload: RegisterModel = {
          firstName: this.registerForm.value.firstName as string,
          lastName: this.registerForm.value.lastName as string,
          middleName: this.registerForm.value.middleName as string,
          emailAddress: this.registerForm.value.emailAddress as string,
          password: this.registerForm.value.password as string,
          confirmPassword: this.registerForm.value.confirmPassword as string,
          phoneNumber: this.registerForm.value.phoneNumber as string,
          gender: this.registerForm.value.gender as GenderEnum
        }

        this.loading = true;
        this.accountService.registerObservable(payload)
          .subscribe({
            next: (data: any) => {
              this.loading = <boolean>data.loading;
              let result = (<GenericResponseModel>data.data.registerUser).payload;
              if(result.success){
                this.router.navigate(['/account/confirm'], {
                  queryParams: { email: payload.emailAddress }
                })
                this.appService.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success)
              } else{
                this.appService.openSnackBar(result.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
              }
            },
            error: (e: Error) => {
              this.loading = false;
              this.appService.openSnackBar('Registration failed. Please try again later.', 
                SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
            }
          })
      }
      else{
        this.isTermAccepted = false;
      }
    }else{
      this.isTermAccepted = false;
    }
  }

  clickEvent(e: MouseEvent){
    this.accountService.clickEvent(e)
  }
}
