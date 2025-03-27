import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AlertComponent } from '../../common/alert/alert.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { AlertModel } from '../../../models/common/alert-models';
import { RouterLink } from '@angular/router';
import { ProjectResponseModel } from '../../../models/project/project-models';
import { MatButtonModule } from '@angular/material/button';
import { AppService } from '../../../services/app.service';
import { ProjectService } from '../../../services/project.service';
import { getGenericErrorMessage } from '../../../models/common/common-models';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';
import { AlertClassEnum, AlertIconEnum } from '../../../enums/alert-enums';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { StringifyPipe } from '../../../pipes/stringify.pipe';
import { ValueornullPipe } from '../../../pipes/valueornull.pipe';
import { DialogService } from '../../../services/dialog.service';
import { MatDialogData } from '../../../models/common/snackbar-model';

@Component({
  selector: 'app-project-management',
  imports: [
    MatIconModule,
    MatProgressSpinner,
    AlertComponent,
    MatSelectModule,
    MatOptionModule,
    RouterLink,
    MatButtonModule,
    TruncatePipe,
    StringifyPipe,
    ValueornullPipe
  ],
  templateUrl: './project-management.component.html',
  styleUrl: './project-management.component.scss'
})
export class ProjectManagementComponent {
  loading: boolean = false;
  alerInputs = new AlertModel();
  error!: Error;
  projects: ProjectResponseModel[] = [];
  appService = inject(AppService);
  projectService = inject(ProjectService);
  dialogService = inject(DialogService);

  ngOnInit(){
    this.getProjects();
  }

  getProjects(){
    this.loading = true;
    this.projectService.getProjectsObservable()
      .valueChanges
      .subscribe({
        next: (data: any) => {
          this.loading = (<boolean>data.loading)
          let result = data.data;
          if(result){
            this.projects = (<ProjectResponseModel[]>result.projects)
            if(this.projects.length <= 0){
              this.alerInputs = this.appService.mapAlertMessage(this.alerInputs,
                'No record', 'No record found. Please add some.',
                AlertIconEnum.info, AlertClassEnum.info
              )
            }
          } else {
            this.alerInputs = this.appService.mapAlertMessage(this.alerInputs,
              'An error occurred', getGenericErrorMessage(OperationTypeEnum.getMany),
              AlertIconEnum.danger, AlertClassEnum.danger
            )
          }
        },
        error: (error: Error) => {
          this.loading = false;
          this.error = error;
          this.alerInputs = this.appService.mapAlertMessage(this.alerInputs,
            'An error occurred', getGenericErrorMessage(OperationTypeEnum.getMany),
            AlertIconEnum.danger, AlertClassEnum.danger
          )
        }
      })
  }

  goBack(){
    this.appService.goBack()
  }

  confirmDelete(id: string, name: string){
    let ref = this.dialogService.openDeleteProjectDialog(id, name)
    ref.afterClosed().subscribe(result => {
      let data = (<MatDialogData>result);
      if(data && data.refresh){
        this.getProjects()
      }
    })
  }
}
