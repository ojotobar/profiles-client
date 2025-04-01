import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AppService } from '../../../services/app.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { getGenericErrorMessage, ResponseModel } from '../../../models/common/common-models';
import { ProjectModel, ProjectResponseModel } from '../../../models/project/project-models';
import { AlertModel } from '../../../models/common/alert-models';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';
import { AlertIconEnum, AlertClassEnum } from '../../../enums/alert-enums';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertComponent } from '../../common/alert/alert.component';

@Component({
  selector: 'app-edit-project',
  imports: [
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinner,
    AlertComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss'
})
export class EditProjectComponent {
  id!: string | null;
  loading: boolean = false;
  isSaving: boolean = false;
  project!: ProjectResponseModel;
  alertInputs = new AlertModel()
  editForm!: FormGroup;
  appService = inject(AppService);
  projectService = inject(ProjectService);

  constructor(public readonly fb: FormBuilder, private readonly aRoute: ActivatedRoute){
    this.aRoute.paramMap.subscribe(route => {
      this.id = route.get('id');
    }) 
  }

  ngOnInit() {
    this.getProjectById(this.id)
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      link: [''],
      technologies: this.fb.array([])
    })
  }

  getProjectById(id: string | null){
    if(id){
      this.loading = true;
      this.projectService.getProjectObservable(id)
        .valueChanges
        .subscribe({
          next: (data: any) => {
            this.loading = (<boolean>data.loading);
            this.project = (<ProjectResponseModel>data.data.project);
            if(this.project){
              this.patchValues(this.project)
            } else{
              this.alertInputs = this.appService.mapAlertMessage(this.alertInputs, 'No record found',
                `No employemnt history found with the Id ${this.id}`, AlertIconEnum.danger, AlertClassEnum.danger);
            }
          },
          error: (_: Error) => {
            this.loading = false;
            this.alertInputs = this.appService.mapAlertMessage(this.alertInputs, 'An error occurred',
              getGenericErrorMessage(OperationTypeEnum.get), AlertIconEnum.danger, AlertClassEnum.danger)
          }
        })
    }
  }

  patchValues(data: ProjectResponseModel){
    this.editForm.patchValue(data);
    const techArr = this.editForm.get('technologies') as FormArray;
    techArr.clear();
    
    if (data.technologies && Array.isArray(data.technologies)) {
      data.technologies.forEach((acc) => {
        techArr.push(this.fb.control(acc));
      });
    }
  }

  ProcessEditProject(){
    if(this.editForm.valid && this.id){
      let form = this.editForm.value;
      let payload: ProjectModel = {
        projectName: form.name as string,
        summary: form.description as string,
        link: form.link as string | null,
        technologies: form.technologies
      }

      this.isSaving = true;
      this.projectService.updateProjectObservable(this.id, payload)
        .subscribe({
          next: (data: any) => {
            
            this.isSaving = (<boolean>data.loading);
            let result = data.data;
            if(result){
              let res = (<ResponseModel>result.updateProject.projectPayload)
              if(res && res.success){
                this.appService.openSnackBar(res.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
                this.appService.goBack();
              } else {
                this.appService.openSnackBar(res.message, 
                  SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
              }
            } else{
              this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.update), 
                SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
            }
          },
          error: (_: Error) => {
            this.isSaving = false;
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.update), 
                SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
          }
        })
    }
  }
}
