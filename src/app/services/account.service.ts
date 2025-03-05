import { Injectable, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { LoginMutation } from './mutations/account-mutations';
import { LoginModel } from '../models/account/login-model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private isHidden = new BehaviorSubject(true);
  constructor(private readonly apollo: Apollo) { }

  login(loginPayload: LoginModel){
    this.apollo
      .mutate({
        mutation: LoginMutation,
        variables: {
          "input": {
            "input": {
              "email": loginPayload.email,
              "password": loginPayload.password
            }
          }
        },
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);
        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }

  hide = this.isHidden.asObservable();

  clickEvent(event: MouseEvent) {
    this.isHidden.next(!this.isHidden.value)
    event.stopPropagation();
  }
}
