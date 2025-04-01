import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { AppService } from '../../../services/app.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FieldErrorsDirective } from '../../../directives/field-errors.directive';
import { getAddProjectPayloads, ProjectModel } from '../../../models/project/project-models';
import { getGenericErrorMessage, ResponseModel } from '../../../models/common/common-models';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-project',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    FieldErrorsDirective,
    MatProgressSpinnerModule
  ],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})
export class AddProjectComponent {
  loading: boolean = false;
  addForm: FormGroup;
  projectService = inject(ProjectService)
  appService = inject(AppService)

  constructor(public readonly fb: FormBuilder){
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      link: [],
      technologies: this.fb.array([])
    })
  }

  ProcessAddProject(){
    if(this.addForm.valid){
      let form = this.addForm.value;
      this.loading = true;
      this.projectService.addProjectsObservable(getAddProjectPayloads(form))
        .subscribe({
          next: (data: any) => {
            this.loading = (<boolean>data.loading);
            let result = (<ResponseModel>data.data.addProjects.projectsPayload);
            if(result.success){
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
              this.appService.goBack()
            } else {
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
            }
          },
          error: (error: Error) => {
            this.loading = false;
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.add),
              SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
        })
    }
  }
}
