import { HostListener, inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { SnackbarClassEnum, SnackbarIconEnum } from '../enums/snackbar-enum';
import { UserClaimsModel } from '../models/account/user-claims-model';
import { MatDialogData, SnackbarModel } from '../models/common/snackbar-model';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SectionsModel } from '../models/common/sections-model';
import { MessageSubjectModel } from '../models/common/message-subject-model';
import { MessageSubjectEnum } from '../enums/message-subject-enum';
import { ContactMessageModel } from '../models/common/contact-message-model';
import { AlertModel } from '../models/common/alert-models';
import { AlertClassEnum, AlertIconEnum } from '../enums/alert-enums';
import { EducationLevelEnum } from '../enums/education-level-enum';
import { SnackbarAnnotatedComponent } from '../components/utilities/snackbar-annotated/snackbar-annotated.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { Apollo, TypedDocumentNode } from 'apollo-angular';
import { MatDialogFileUploadData } from '../models/common/common-models';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private isSidebarOpened = new BehaviorSubject(false);
  private isLoggedIn = new BehaviorSubject(localStorage.getItem('accessToken') !== null);
  private viewportWidth = new BehaviorSubject(0);
  private viewportHeight = new BehaviorSubject(0);
  private snackbarModel = new SnackbarModel();
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  private _snackBar = inject(MatSnackBar);
  private _clipboard = inject(Clipboard);
  private _apollo = inject(Apollo);

  getIsSidebarOpened = this.isSidebarOpened.asObservable();
  getIsLoggedIn = this.isLoggedIn.asObservable();
  getViewportWidth = this.viewportWidth.asObservable();
  getViewportHeight = this.viewportHeight.asObservable();

  constructor(private readonly location: Location) { }

  copyText(text: string): boolean {
    if (!text) return false;
    const copied = this._clipboard.copy(text);
    return copied;
  }

  uploadFileObservable(file: File, mutation: TypedDocumentNode<unknown, unknown>): Observable<any> {
    return this._apollo.mutate({
      mutation: mutation,
      variables: {
        input: { file }
      },
      context: {
        useMultipart: true
    }})
  };

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

  openSnackBar(message: string, color: SnackbarClassEnum, icon: SnackbarIconEnum, duration: number = 7000){
    this.snackbarModel.message = message;
    this.snackbarModel.icon = icon;
    this.snackbarModel.color = color;

    this._snackBar.openFromComponent(SnackbarAnnotatedComponent, {
      duration:  duration,
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
      new SectionsModel('experiences', 'Experience', '/experiences'),
      new SectionsModel('educations', 'Education', '/educations'),
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

  currentTime(): Date {
    return new Date()
  }

  getUserGreeting(): string {
    let time = this.currentTime();
    let hour = time.getHours();
    if(hour >= 0 && hour < 12){
      return 'Good morning';
    } else if(hour >= 12 && hour < 16){
      return 'Good afternoon';
    } else if (hour > 16) {
      return 'Good evening'
    } else {
      return 'Good day'
    }
  }

  getForms(form: FormGroup<any>, ctrName: string) {
    return form.get(ctrName) as FormArray;
  }
  
  removeForm(techIndex: number, form: FormGroup<any>, ctrName: string){
    this.getForms(form, ctrName).removeAt(techIndex);
  }

  addForm(form: FormGroup<any>, fb: FormBuilder, ctrName: string) {
    this.getForms(form, ctrName).push(fb.control('', Validators.required));
  }

  closeDialog(ref: MatDialogRef<any>, data: MatDialogData){
    ref.close(data);
  }

  closeFileDialog(ref: MatDialogRef<any>, data: MatDialogFileUploadData){
    ref.close(data);
  }

  @HostListener('window:resize', ['$event'])
    onWindowResize() {
      this.viewportHeight.next(window.innerHeight);
      this.viewportWidth.next(window.innerWidth)
  }
}
