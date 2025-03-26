import { Component, inject } from '@angular/core';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  appService = inject(AppService)

  goBack(){
    this.appService.goBack()
  }
}
