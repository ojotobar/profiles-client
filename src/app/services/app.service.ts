import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { SnackbarClassEnum, SnackbarIconEnum } from '../enums/snackbar-enum';
import { UserClaimsModel } from '../models/account/user-claims-model';
import { SnackbarModel } from '../models/common/snackbar-model';
import { SnackbarAnnotatedComponent } from '../utilities/snackbar-annotated/snackbar-annotated.component';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SectionsModel } from '../models/common/sections-model';
import { MessageSubjectModel } from '../models/common/message-subject-model';
import { MessageSubjectEnum } from '../enums/message-subject-enum';
import { ContactMessageModel } from '../models/common/contact-message-model';
import { AlertModel } from '../models/common/alert-models';
import { AlertClassEnum, AlertIconEnum } from '../enums/alert-enums';
import { EducationLevelEnum } from '../enums/education-level-enum';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private isSidebarOpened = new BehaviorSubject(false);
  private isLoggedIn = new BehaviorSubject(localStorage.getItem('accessToken') !== null);
  private snackbarModel = new SnackbarModel();
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  getIsSidebarOpened = this.isSidebarOpened.asObservable();
  getIsLoggedIn = this.isLoggedIn.asObservable();

  constructor(private readonly location: Location) { }

  goBack(){
    this.location.back();
  }
  
  setIsSidebarOpened(isSidebarOpened: boolean){
    this.isSidebarOpened.next(isSidebarOpened);
  }

  setClaims(claim: UserClaimsModel){
    localStorage.setItem('accessToken', claim.accessToken);
    this.isLoggedIn.next(localStorage.getItem('accessToken') !== null)
  }

  setIsLoggedIn(isLoggedIn: boolean){
    this.isLoggedIn.next(isLoggedIn);
  }

  openSnackBar(message: string, color: SnackbarClassEnum, icon: SnackbarIconEnum){
    this.snackbarModel.message = message;
    this.snackbarModel.icon = icon;
    this.snackbarModel.color = color;

    this._snackBar.openFromComponent(SnackbarAnnotatedComponent, {
      duration:  7000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: this.snackbarModel
    });
  }

  getQueryParam(route: ActivatedRoute, param: string): string | null {
    let valueToReturn: string | null = ''
    route.queryParamMap.subscribe((params) => {
      const value = params.get(param);
      valueToReturn = value;
    })

    return valueToReturn;
  }

  getSections(): SectionsModel[] {
    return [
      new SectionsModel('experience', 'Experience', '/experience'),
      new SectionsModel('education', 'Education', '/education'),
      new SectionsModel('skills', 'Skills', '/skills'),
      new SectionsModel('certifications', 'Certifications', '/certifications'),
      new SectionsModel('projects', 'Projects', '/projects'),
      new SectionsModel('careersummary', 'Career Summary', '/career-summary')
    ]
  }

  getMessageSubjectOptions(): MessageSubjectModel[] {
    return [
      new MessageSubjectModel('General Inquiry', MessageSubjectEnum.GeneralInquiry),
      new MessageSubjectModel('Support', MessageSubjectEnum.Support),
      new MessageSubjectModel('Business Inquiry', MessageSubjectEnum.BusinessInquiry),
      new MessageSubjectModel('Other', MessageSubjectEnum.Other)
    ]
  }

  getEducationLevelOptions() {
    return [
        { label: 'Others', value: EducationLevelEnum.Other },
        { label: 'Diploma', value: EducationLevelEnum.OrdinaryDiploma },
        { label: 'Higher Diploma', value: EducationLevelEnum.HigherDiploma },
        { label: 'Bachelor', value: EducationLevelEnum.Bachelor },
        { label: 'Masters', value: EducationLevelEnum.Masters },
        { label: 'Doctorate', value: EducationLevelEnum.Doctorate }
      ]
  }

  sendContactMessage(payload: ContactMessageModel){
    this.openSnackBar('Thanks for reaching out! We’ll get back to you soon.', SnackbarClassEnum.Success, SnackbarIconEnum.Success);
  }

  mapAlertMessage(message: AlertModel, heading: string, msg: string, 
    icon: AlertIconEnum, style: AlertClassEnum): AlertModel {
    message.heading = heading;
    message.message = msg;
    message.icon = icon;
    message.bg = style;
    return message;
  }
}
