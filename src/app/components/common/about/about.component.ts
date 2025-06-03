import { Component } from '@angular/core';
import { AppNameComponent } from '../app-name/app-name.component';

@Component({
  selector: 'app-about',
  imports: [AppNameComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
