import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PasswordResetModel } from '../../../models/account/password-reset-model';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-reset-password',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule 
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  errorMessage = signal('');
  resetForm = new FormGroup({
    emailAddress: new FormControl('', Validators.compose([Validators.required, Validators.email])),
  })

  constructor(private appService: AppService){
    
  }


  updateErrorMessage() {
    
  }
  
  ProcessPasswordReset() {
    if(this.resetForm.valid){
      let resetPayload: PasswordResetModel = {
        emailAddress: this.resetForm.value.emailAddress as string,
      }
      console.log(resetPayload)
    }
  }

  GoBack(){
    this.appService.goBack()
  }
}

