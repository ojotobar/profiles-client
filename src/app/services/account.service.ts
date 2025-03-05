import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private isHidden = new BehaviorSubject(true);
  constructor() { }

  hide = this.isHidden.asObservable();

  clickEvent(event: MouseEvent) {
    this.isHidden.next(!this.isHidden.value)
    event.stopPropagation();
  }
}
