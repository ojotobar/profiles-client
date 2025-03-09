import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AccountVerificationModel } from '../../models/account/account-verification-model';
import { AccountService } from '../../services/account.service';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-account-confirmation',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    RouterLink,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './account-confirmation.component.html',
  styleUrl: './account-confirmation.component.scss'
})
export class AccountConfirmationComponent {
  email: string | null = '';

  constructor(private readonly route: ActivatedRoute, 
    private readonly accountService: AccountService, 
    private readonly appService: AppService){}

  ngOnInit(){
    this.email = this.appService.getQueryParam(this.route, 'email')
  }

  confirmationForm = new FormGroup({
    otp: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
  });

  ProcessConfirmation(){
    if(this.confirmationForm.valid){
      let payload: AccountVerificationModel = {
        otp: this.confirmationForm.value.otp as string,
        email: this.email as string
      }
      console.log(payload)

      this.accountService.confirmAccount(payload)
    }
  }

  ResendOtp(){
    this.accountService.resendConfirmationCode(this.email);
  }
}
