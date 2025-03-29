import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SkillLevelEnum } from '../../../enums/skill-level-enum';
import { AppService } from '../../../services/app.service';
import { SkillService } from '../../../services/skill.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SkillModel, SkillResponseModel } from '../../../models/skills/skills-models';
import { AlertComponent } from '../../common/alert/alert.component';
import { AlertModel } from '../../../models/common/alert-models';
import { ActivatedRoute } from '@angular/router';
import { GenericResponseModel, getGenericErrorMessage } from '../../../models/common/common-models';
import { AlertClassEnum, AlertIconEnum } from '../../../enums/alert-enums';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';

@Component({
  selector: 'app-edit-skill',
  imports: [
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    TitleCasePipe,
    MatProgressSpinner,
    AlertComponent
  ],
  templateUrl: './edit-skill.component.html',
  styleUrl: './edit-skill.component.scss'
})
export class EditSkillComponent {
  id: string | null = '';
  loading: boolean = false;
  isBusy: boolean = false;
  editForm!: FormGroup;
  skill!: SkillResponseModel;
  alert = new AlertModel();
  skillLevels = Object.values(SkillLevelEnum);
  appService = inject(AppService);
  skillService = inject(SkillService)

  constructor(private readonly fb: FormBuilder, private readonly aRoute: ActivatedRoute){
    this.aRoute.paramMap.subscribe(route => {
      this.id = route.get('id')
    })
  }

  ngOnInit(){
    this.getSkill(this.id)
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      level: [SkillLevelEnum.Beginner, Validators.required],
      years: [0, [Validators.required, Validators.min(0)]],
      isCertified: [false]
    })
  }

  getSkill(id: string | null){
    if(id){
      this.loading = true;
      this.skillService.getSkillObservable(id)
        .valueChanges
        .subscribe({
          next: (data: any) => {
            this.loading = (<boolean>data.loading);
            this.skill = (<SkillResponseModel>data.data.skill);
            if(this.skill){
              this.editForm.patchValue(this.skill);
              this.editForm.patchValue({ years: this.skill.yearsOfExperience, isCertified: this.skill.certified });
            } else{
              this.alert = this.appService.mapAlertMessage(this.alert, 'No record', 
                'No record found for the selected Id.', AlertIconEnum.danger, AlertClassEnum.danger
              )
            }
          },
          error: (_: Error) => {
            this.loading = false;
            this.alert = this.appService.mapAlertMessage(this.alert,
              'An error occurred', getGenericErrorMessage(OperationTypeEnum.get), AlertIconEnum.danger, AlertClassEnum.danger
            )
          }
        })
    }
  }

  ProcessUpdateSkill(){
    if(this.editForm.valid && this.id){
      let form = this.editForm.value;
      let payload = (<SkillModel>form);
      this.isBusy = true;
      this.skillService.updateSkillObservable(this.id, payload)
        .subscribe({
          next: (data: any) => {
            this.isBusy = (<boolean>data.loading);
            console.log(data)
            let result = (<GenericResponseModel>data.data.updateSkill);
            if(result && result.payload){
              if(result.payload.success){
                this.appService.openSnackBar(result.payload.message,
                    SnackbarClassEnum.Success, SnackbarIconEnum.Success);
                this.appService.goBack();
              } else {
                this.appService.openSnackBar(result.payload.message,
                  SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
              }
            } else {
              this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.update),
                SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
            }
          },
          error: (_: Error) => {
            this.isBusy = false;
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.update),
                SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
          }
        })
    }
  }
}
