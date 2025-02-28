import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { AppService } from '../../../app.service';
import { MatSelectModule } from '@angular/material/select';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegisterModel } from '../../../models/account/register-model';
import { GenderEnum } from '../../../enums/gender-enum';
import { FormErrorStateMatcher } from '../../../models/common/error-state-matcher';

@Component({
  selector: 'app-register-dialog',
  imports: [
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule
  ],
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.scss'
})
export class RegisterDialogComponent {
  registerModel: RegisterModel = {
    firstName: '',
    lastName: '',
    middleName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    gender: GenderEnum.NotSpecified
  };
  passwordMatches: boolean = false;
  value: string = GenderEnum.NotSpecified;
  options = [
    {label: 'Not Specified', value: GenderEnum.NotSpecified},
    {label: 'Male', value: GenderEnum.Male},
    {label: 'Female', value: GenderEnum.Female}
  ];

  constructor(private dialog: MatDialog, private appService: AppService){}

  firstNameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  cPasswordFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  errorMatcher = new FormErrorStateMatcher();

  processRegistration(form: any){
    console.log(this.registerModel)
  }  

  checkPasswordMatch(){
      this.passwordMatches = this.registerModel.password === this.registerModel.confirmPassword;
  }

  openLoginDialog() {
    this.dialog.closeAll()
    this.dialog.open(LoginDialogComponent, {
      position: { top: '12vh' },
      disableClose: true
    });
  }
}
