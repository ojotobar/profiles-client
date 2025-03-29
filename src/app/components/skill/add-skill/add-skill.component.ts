import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SkillLevelEnum } from '../../../enums/skill-level-enum';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppService } from '../../../services/app.service';
import { SkillService } from '../../../services/skill.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TitleCasePipe } from '@angular/common';
import { SkillModel, SkillResponseModel } from '../../../models/skills/skills-models';
import { GenericResponseModel, getGenericErrorMessage } from '../../../models/common/common-models';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-skill',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    TitleCasePipe,
    MatProgressSpinner
  ],
  templateUrl: './add-skill.component.html',
  styleUrl: './add-skill.component.scss'
})
export class AddSkillComponent {
  addForm!: FormGroup;
  numberOfSkills: number = 0;
  numberOfAllowedSkill: number = 20
  skillLevels = Object.values(SkillLevelEnum);
  skillModels: SkillResponseModel[] = [];
  loading: boolean = false;
  isMaxAccReached: boolean = false;
  appService = inject(AppService);
  skillService = inject(SkillService)

  constructor(public readonly fb: FormBuilder){
    this.addForm = this.fb.group({
      skills: this.fb.array([
        this.createSkillGroup()
      ])
    });

    this.numberOfAllowedSkill--;
    this.getNumbersOfSkills();
  }

  ProcessAddSkills() {
    if(this.addForm.valid){
      let payloads = (<SkillModel[]>this.addForm.get('skills')?.value);
      this.loading = true;
      this.skillService.addSkillsObservable(payloads)
        .subscribe({
          next: (data: any) => {
            this.loading = (<boolean>data.loading);
            let result = (<GenericResponseModel>data.data.addSkills)
            if(result){
              if(result.payload.success){
                this.appService.openSnackBar(result.payload.message,
                    SnackbarClassEnum.Success, SnackbarIconEnum.Success);
                this.appService.goBack();
              } else{
                this.appService.openSnackBar(result.payload.message,
                    SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
              }
            } else {
              this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.add),
                  SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
            }
          },
          error: (_: Error) => {
            this.loading = false;
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.add),
              SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
        })
    }
  }

  getNumbersOfSkills(){
    this.skillService.getSkillCount()
      .valueChanges
      .subscribe({
        next: (data: any) => {
          this.numberOfSkills = (<number>data.data.skillsCount)
        }
      })
  }

  get skills(): FormArray {
    return this.addForm.get('skills') as FormArray;
  }

  get allowedSkillsToAdd(): number {
    return this.numberOfAllowedSkill - this.numberOfSkills;
  }

  createSkillGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      level: [SkillLevelEnum.Beginner, Validators.required],
      years: [0, [Validators.required, Validators.min(0)]],
      isCertified: [false]
    });
  }

  addSkill() {
    if(this.allowedSkillsToAdd > 0){
      this.skills.push(this.createSkillGroup());
      this.numberOfAllowedSkill--;
    } else {
      this.isMaxAccReached = true;
    }
  }

  removeSkill(index: number) {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
      this.numberOfAllowedSkill++;
      this.isMaxAccReached = false;
    }
  }
}
