import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LoginModel } from '../../models/account/login-model';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-login',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  constructor(private appService: AppService, private accountService: AccountService){}

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  loginForm = new FormGroup({
    emailAddress: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)]))
  })

  ProcessLogin() {
    if(this.loginForm.valid){
      let loginPayload: LoginModel = {
        email: this.loginForm.value.emailAddress as string,
        password: this.loginForm.value.password as string
      }
      this.accountService.login(loginPayload)
    }
  }

  GoBack(){
    this.appService.goBack()
  }
}
