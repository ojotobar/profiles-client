import { Component } from '@angular/core';
import {MatCardContent, MatCardModule} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { AppService } from '../../app.service';
import { RouterLink } from '@angular/router';

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
  constructor(private appService: AppService){}
  
  openRegisterDialog() {
    this.appService.openRegistrationDialog();
  }
}
