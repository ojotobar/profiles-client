import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-app-name',
  imports: [],
  templateUrl: './app-name.component.html',
  styleUrl: './app-name.component.scss'
})
export class AppNameComponent {
  @Input() isDark: boolean = false;
  @Input() fileClass: string = '';
  @Input() profilePlusStyle = '';
  @Input() hostPlusStyle = '';
}
