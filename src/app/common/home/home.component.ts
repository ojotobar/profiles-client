import { Component } from '@angular/core';
import {MatCardContent, MatCardModule} from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    MatCardContent,
    MatButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
