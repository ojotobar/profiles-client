import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private isSidebarOpened = new BehaviorSubject(false);
  getIsSidebarOpened = this.isSidebarOpened.asObservable();

  constructor() { }

  setIsSidebarOpened(isSidebarOpened: boolean){
    this.isSidebarOpened.next(isSidebarOpened);
  }
}
