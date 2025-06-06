import { Component, inject } from '@angular/core';
import {MatCardContent, MatCardModule} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    MatCardContent,
    MatButton,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isLoggedIn: boolean = localStorage.getItem('accessToken') !== null;
  
  constructor(private readonly appService: AppService){
    this.appService.getIsLoggedIn
      .subscribe(l => this.isLoggedIn = l);
  }
}
