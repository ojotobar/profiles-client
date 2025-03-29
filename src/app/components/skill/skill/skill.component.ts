import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { AlertModel } from '../../../models/common/alert-models';
import { SkillResponseModel } from '../../../models/skills/skills-models';
import { AppService } from '../../../services/app.service';
import { SkillService } from '../../../services/skill.service';
import { AlertComponent } from '../../common/alert/alert.component';
import { InlineBackComponent } from '../../common/inline-back/inline-back.component';
import { getGenericErrorMessage } from '../../../models/common/common-models';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';
import { AlertClassEnum, AlertIconEnum } from '../../../enums/alert-enums';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { TitleCasePipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogService } from '../../../services/dialog.service';
import { MatDialogData } from '../../../models/common/snackbar-model';

@Component({
  selector: 'app-skill',
  imports: [
    AlertComponent,
    MatProgressSpinner,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    InlineBackComponent,
    MatSelectModule,
    MatOptionModule,
    TitleCasePipe,
    MatCheckboxModule
  ],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss'
})
export class SkillComponent {
  alert = new AlertModel();
  numberOfSkills: number = 0;
  allowedNumbers: number = 20;
  loading: boolean = false;
  error!: Error;
  skills: SkillResponseModel[] = []
  skillService = inject(SkillService);
  appService = inject(AppService);
  dialogService = inject(DialogService);

  ngOnInit() {
    this.getSkills();
    this.getNumbersOfSkills();
  }

  getSkills(){
    this.loading = true;
    this.skillService.getSkillsObservable()
      .valueChanges
      .subscribe({
        next: (data: any) => {
          this.loading = (<boolean>data.loading);
          this.skills = (<SkillResponseModel[]>data.data.skills);
          if(this.skills.length <= 0){
            this.alert = this.appService.mapAlertMessage(this.alert,
              'No record', 'No skill record found. Please add some',
              AlertIconEnum.info, AlertClassEnum.info)
          }
        },
        error: (error: Error) => {
          this.loading = false;
          this.error = error;
          this.alert = this.appService.mapAlertMessage(this.alert,
              'An error occurred', getGenericErrorMessage(OperationTypeEnum.getMany),
              AlertIconEnum.danger, AlertClassEnum.danger
          )
        }
      })
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

  confirmDelete(id: string, name: string){
    let ref = this.dialogService.openDeleteSKillDialog(id, name);
    ref.afterClosed().subscribe(result => {
      let res = (<MatDialogData>result);
      if(res.refresh){
        this.getSkills();
        this.getNumbersOfSkills();
      }
    })
  }
}
