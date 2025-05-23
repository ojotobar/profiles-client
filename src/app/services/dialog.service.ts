import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppService } from './app.service';
import { DeleteCertificationComponent } from '../components/dialogs/delete-certification/delete-certification.component';
import { DeleteEducationComponent } from '../components/dialogs/delete-education/delete-education.component';
import { DeleteExperienceComponent } from '../components/dialogs/delete-experience/delete-experience.component';
import { DeleteProjectComponent } from '../components/dialogs/delete-project/delete-project.component';
import { DeleteCareerSummaryComponent } from '../components/dialogs/delete-career-summary/delete-career-summary.component';
import { DeleteSkillComponent } from '../components/dialogs/delete-skill/delete-skill.component';
import { UploadFilesComponent } from '../components/dialogs/upload-files/upload-files.component';
import { MatDialogFileUploadData } from '../models/common/common-models';
import { LocationComponent } from '../components/dialogs/location/location.component';
import { UpdateProfileDetailsComponent } from '../components/dialogs/update-profile-details/update-profile-details.component';
import { ChangePasswordComponent } from '../components/dialogs/change-password/change-password.component';
import { ChangeUserStatusComponent } from '../components/dialogs/change-user-status/change-user-status.component';
import { ChangeUserRoleComponent } from '../components/dialogs/change-user-role/change-user-role.component';
import { DeleteUserComponent } from '../components/dialogs/delete-user/delete-user.component';
import { ViewUserDetailsComponent } from '../components/dialogs/view-user-details/view-user-details.component';
import { AddRoleComponent } from '../components/dialogs/add-role/add-role.component';
import { UpdateRoleComponent } from '../components/dialogs/update-role/update-role.component';
import { DeleteRoleComponent } from '../components/dialogs/delete-role/delete-role.component';
import { DeleteFaqsComponent } from '../components/dialogs/delete-faqs/delete-faqs.component';
import { AddFaqsComponent } from '../components/dialogs/add-faqs/add-faqs.component';
import { UpdateFaqsComponent } from '../components/dialogs/update-faqs/update-faqs.component';

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

  openLocationDialog(id: string, name: string, isNew: boolean): MatDialogRef<LocationComponent, any> {
    return this.dialog.open(LocationComponent, {
      position: { top: '5vh' },
      disableClose: true,
      data: { id: id, name: name, new: isNew }
    })
  }

  openChangePasswordDialog(): MatDialogRef<ChangePasswordComponent, any> {
    return this.dialog.open(ChangePasswordComponent, {
      position: { top: '5vh' },
      disableClose: true,
      data: { refresh: false }
    })
  }

  openUpdateProfileDetailsDialog(): MatDialogRef<UpdateProfileDetailsComponent, any> {
    return this.dialog.open(UpdateProfileDetailsComponent, {
      position: { top: '12vh' },
      disableClose: true,
      data: { refresh: false }
    })
  }

  openFileUploadDialog(data: MatDialogFileUploadData): MatDialogRef<UploadFilesComponent, any> {
    return this.dialog.open(UploadFilesComponent, {
      position: { top: '12vh' },
      disableClose: true,
      data: data
    })
  }

  openStatusChangeDialog(id: string, name: string): MatDialogRef<ChangeUserStatusComponent, any> {
    return this.dialog.open(ChangeUserStatusComponent, {
      position: { top: '12vh' },
      disableClose: true,
      data: { id: id, name: name }
    })
  }

  openRoleChangeDialog(id: string, name: string): MatDialogRef<ChangeUserRoleComponent, any> {
    return this.dialog.open(ChangeUserRoleComponent, {
      position: { top: '12vh' },
      disableClose: true,
      data: { id: id, name: name }
    })
  }

  openDeleteUserDialog(id: string, name: string): MatDialogRef<DeleteUserComponent, any> {
    return this.dialog.open(DeleteUserComponent, {
      position: { top: '12vh' },
      disableClose: true,
      data: { id: id, name: name }
    })
  }

  openViewUserDialog(id: string): MatDialogRef<ViewUserDetailsComponent, any> {
    return this.dialog.open(ViewUserDetailsComponent, {
      position: { top: '12vh' },
      disableClose: true,
      data: { id: id }
    })
  }

  openAddRoleDialog(name: string): MatDialogRef<AddRoleComponent, any> {
    return this.dialog.open(AddRoleComponent, {
      position: { top: '12vh' },
      disableClose: true,
      data: { name: name }
    })
  }

  openUpdateRoleDialog(id: string, name: string): MatDialogRef<UpdateRoleComponent, any> {
    return this.dialog.open(UpdateRoleComponent, {
      position: { top: '12vh' },
      disableClose: true,
      data: { id: id, name: name }
    })
  }

  openDeleteRoleDialog(id: string, name: string): MatDialogRef<DeleteRoleComponent, any> {
    return this.dialog.open(DeleteRoleComponent, {
      position: { top: '12vh' },
      disableClose: true,
      data: { id: id, name: name }
    })
  }

  openDeleteFaqsDialog(id: string, name: string): MatDialogRef<DeleteFaqsComponent, any> {
    return this.dialog.open(DeleteFaqsComponent, {
      position: { top: '12vh' },
      disableClose: true,
      data: { id: id, name: name }
    })
  }

  openAddFaqsDialog(name: string): MatDialogRef<AddFaqsComponent, any> {
    return this.dialog.open(AddFaqsComponent, {
      position: { top: '12vh' },
      disableClose: true,
      data: { name: name }
    })
  }

  openUpdateFaqsDialog(id: string): MatDialogRef<UpdateFaqsComponent, any> {
    return this.dialog.open(UpdateFaqsComponent, {
      position: { top: '12vh' },
      disableClose: true,
      data: { id: id }
    })
  }
}
