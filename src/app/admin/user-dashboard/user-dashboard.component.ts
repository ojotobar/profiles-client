import { Component, inject } from '@angular/core';
import { AppService } from '../../services/app.service';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { ProfileResultModel } from '../../models/profile/profile-models';

@Component({
  selector: 'app-user-dashboard',
  imports: [
    RouterLink
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  appService = inject(AppService);
  profileService = inject(ProfileService)
  sections = this.appService.getSections();
  greeting = this.appService.getUserGreeting();
  personalizedGreeting: string = this.greeting;

  ngOnInit(){
    this.profileService.getProfile()
      .valueChanges
      .subscribe({
        next: (data: any) => {
          let result = (<ProfileResultModel>data.data);
          if(result){
            this.personalizedGreeting = `${this.greeting}, ${result.profile.firstName}`
          }
        },
        error: (error: Error) => {
        }
      })
  }
}
