import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteEducationComponent } from '../dialogs/delete-education/delete-education.component';
import { AppService } from './app.service';
import { DeleteExperienceComponent } from '../dialogs/delete-experience/delete-experience.component';
import { DeleteCertificationComponent } from '../dialogs/delete-certification/delete-certification.component';

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
}
