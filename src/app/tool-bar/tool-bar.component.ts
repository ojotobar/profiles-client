import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppService } from '../app.service';
import { RouterLink } from '@angular/router';
import { SnackbarModel } from '../../models/snackbar.model';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../enums/snackbar.enum';

@Component({
  selector: 'app-tool-bar',
  imports: [
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.scss'
})
export class ToolBarComponent implements OnInit {
  loggedIn: boolean = false;
  isSideBarOpened: boolean = false;
  snackBarModel: SnackbarModel = new SnackbarModel();

  constructor(private appService: AppService){
    this.appService.getIsSidebarOpened
      .subscribe(s => this.isSideBarOpened = s);

    this.appService.getIsLoggedIn
      .subscribe(l => this.loggedIn = l);
  }

  ngOnInit(): void {
    
  }

  toggleLogin(): void {
    this.appService
      .setIsLoggedIn(!this.loggedIn);

    this.appService.openSnackBar("Logged in successfully. With some random text to test if the texts will wrap on overflow.", SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
  }

  toggleShowSidebar() {
    this.appService
      .setIsSidebarOpened(!this.isSideBarOpened);
  }
}
