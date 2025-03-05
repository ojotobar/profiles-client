import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AccountService } from '../../services/account.service';
import { AppService } from '../../app.service';
import { GenderEnum } from '../../enums/gender-enum';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { GenderOption } from '../../models/profile/gender-option-model';
import { RouterLink } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';

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
    MatCheckboxModule
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
        console.log(this.registerForm.value)
      }
      else{
        this.isTermAccepted = false;
      }
    }
  }

  goBack(){
    this.appService.goBack();
  }

  clickEvent(e: MouseEvent){
    this.accountService.clickEvent(e)
  }
}
