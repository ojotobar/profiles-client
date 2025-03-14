import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AccountService } from '../../services/account.service';
import { GenderEnum } from '../../enums/gender-enum';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { GenderOption } from '../../models/profile/gender-option-model';
import { RouterLink } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AppService } from '../../services/app.service';
import { RegisterModel } from '../../models/account/register-model';
import { FieldErrorsDirective } from '../../directives/field-errors.directive';

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
    FieldErrorsDirective
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isHidden: boolean = true;
  isTermAccepted: boolean = true;
  
  genderOptions: GenderOption[] = [
    { label: 'Not Specified', value: GenderEnum.NotSpecified },
    { label: 'Male', value: GenderEnum.Male },
    { label: 'Female', value: GenderEnum.Female }
  ]
  
  constructor(private accountService: AccountService,
    private appService: AppService){
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
        this.accountService.register(payload)
      }
      else{
        this.isTermAccepted = false;
      }
    }else{
      this.isTermAccepted = false;
    }
  }

  goBack(){
    this.appService.goBack();
  }

  clickEvent(e: MouseEvent){
    this.accountService.clickEvent(e)
  }
}
