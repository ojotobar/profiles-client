import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'
import { AccountService } from '../services/account.service';
import { UserRoleEnum } from '../enums/user-role-enum';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-side-nav',
  imports: [
    MatSlideToggleModule,
    MatCardModule,
    FormsModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit {
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  isSidebarOpened: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private readonly appService: AppService, private readonly accountService: AccountService){
    this.appService.getIsSidebarOpened
      .subscribe(s => this.isSidebarOpened = s);

    this.appService.getIsLoggedIn
      .subscribe(l => this.isLoggedIn = l);
  }

  ngOnInit(): void {
    
  }

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);

  logOut(){
    this.accountService.logout()
  }

  canViewDashboard(): boolean {
    return this.accountService.canViewPage([UserRoleEnum.admin])
  }
}