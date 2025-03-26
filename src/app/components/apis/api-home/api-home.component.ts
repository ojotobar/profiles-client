import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { InfoApiComponent } from '../info-api/info-api.component';
import { EducationApiComponent } from '../education-api/education-api.component';
import { ExperienceApiComponent } from '../experience-api/experience-api.component';
import { ProjectsApiComponent } from '../projects-api/projects-api.component';
import { SkillsApiComponent } from '../skills-api/skills-api.component';
import { CertificationsApiComponent } from '../certifications-api/certifications-api.component';

@Component({
  selector: 'app-api-home',
  imports: [
    MatTabsModule,
    InfoApiComponent,
    EducationApiComponent,
    ExperienceApiComponent,
    ProjectsApiComponent,
    SkillsApiComponent,
    CertificationsApiComponent
  ],
  templateUrl: './api-home.component.html',
  styleUrl: './api-home.component.scss'
})
export class ApiHomeComponent {

}
