import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppService } from '../app.service';
import { RouterLink } from '@angular/router';

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
  loggedIn: boolean = true;
  isSideBarOpened: boolean = false;

  constructor(private appService: AppService){
    this.appService.getIsSidebarOpened
      .subscribe(s => this.isSideBarOpened = s);
  }

  ngOnInit(): void {
    
  }

  toggleLogin(): void {
    this.loggedIn = !this.loggedIn;
  }

  toggleShowSidebar() {
    this.appService
      .setIsSidebarOpened(!this.isSideBarOpened);
  }
}
