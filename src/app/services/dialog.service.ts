import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppService } from './app.service';
import { DeleteCertificationComponent } from '../components/dialogs/delete-certification/delete-certification.component';
import { DeleteEducationComponent } from '../components/dialogs/delete-education/delete-education.component';
import { DeleteExperienceComponent } from '../components/dialogs/delete-experience/delete-experience.component';
import { DeleteProjectComponent } from '../components/dialogs/delete-project/delete-project.component';
import { DeleteCareerSummaryComponent } from '../components/dialogs/delete-career-summary/delete-career-summary.component';
import { DeleteSkillComponent } from '../components/dialogs/delete-skill/delete-skill.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  appService = inject(AppService);

  constructor(private readonly dialog: MatDialog) { }

  openDeleteEducationDialog(id: string, name: string): MatDialogRef<DeleteEducationComponent, any> {
    return this.dialog.open(DeleteEducationComponent, {
      position: { top: '12vh' },
      disableClose: true,
      data: { id: id, name: name }
    })
  }

  openDeleteExperienceDialog(id: string, name: string): MatDialogRef<DeleteExperienceComponent, any> {
    return this.dialog.open(DeleteExperienceComponent, {
      position: { top: '12vh' },
      disableClose: true,
      data: { id: id, name: name }
    })
  }

  openDeleteCertificationDialog(id: string, name: string): MatDialogRef<DeleteCertificationComponent, any> {
    return this.dialog.open(DeleteCertificationComponent, {
      position: { top: '12vh' },
      disableClose: true,
      data: { id: id, name: name }
    })
  }

  openDeleteProjectDialog(id: string, name: string): MatDialogRef<DeleteProjectComponent, any>{
    return this.dialog.open(DeleteProjectComponent, {
      position: { top: '12vh' },
      disableClose: true,
      data: { id: id, name: name }
    })
  }

  openDeleteSummaryDialog(id: string, name: string): MatDialogRef<DeleteCareerSummaryComponent, any> {
    return this.dialog.open(DeleteCareerSummaryComponent, {
      position: { top: '12vh' },
      disableClose: true,
      data: { id: id, name: name }
    })
  }

  openDeleteSKillDialog(id: string, name: string): MatDialogRef<DeleteSkillComponent, any> {
    return this.dialog.open(DeleteSkillComponent, {
      position: { top: '12vh' },
      disableClose: true,
      data: { id: id, name: name }
    })
  }
}
