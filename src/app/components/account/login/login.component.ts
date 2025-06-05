import { ChangeDetectionStrategy, ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { LoginModel } from '../../../models/account/login-model';
import { AccountService } from '../../../services/account.service';
import { AppService } from '../../../services/app.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { UserClaimsModel } from '../../../models/account/user-claims-model';
import { LoginResultModel } from '../../../models/account/accounts-models';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatProgressSpinnerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loading: boolean = false;
  claims = new UserClaimsModel()

  constructor(public appService: AppService, 
    private accountService: AccountService, private router: Router, private cdr: ChangeDetectorRef){}

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

      this.loading = true;
      this.accountService.loginObservable(loginPayload)
        .subscribe({
          next: (data: any) => {
            this.loading = <boolean>data.loading;
            let result = (<LoginResultModel>data.data.loginUser.loginResult);
            
            if(result.successful && result.accessToken){
              localStorage.setItem('accessToken', result.accessToken);
              localStorage.setItem('role', this.accountService.getUserRoles())
              this.claims.accessToken = result.accessToken;
              this.appService.setClaims(this.claims)
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
              this.appService.goBack()
            }
            else{
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
              if(result.emailNotConfirmed){
                this.router.navigate(['/account/confirm'], {
                  queryParams: { email: loginPayload.email }
                })
              }
            }
            
            this.cdr.detectChanges();
          },
          error: (e: Error) => {
            this.loading = false;
            this.cdr.detectChanges();
            this.appService.openSnackBar('Something went wrong. Login failed. Please try again later.', 
              SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
      })
    }
  }
}
