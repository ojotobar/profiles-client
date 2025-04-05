import { HostListener, Inject, inject, Injectable, LOCALE_ID } from '@angular/core';
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
import {formatDate} from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

  constructor(@Inject(LOCALE_ID) private locale: string, 
    private readonly location: Location) { }

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

  downloadPDF(elementId: string, appDns: string, docName: string) {
    const pdfElement = document.getElementById(elementId);
    if (!pdfElement) return;
    pdfElement.hidden = false;
  
    setTimeout(() => {
      html2canvas(pdfElement, { scale: 2 }).then((canvas) => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
  
        const marginTop = 10; // mm
        const marginBottom = 10; // mm
        const footerText = `© Pro-files ${new Date().getFullYear()} | ${appDns}`;
  
        const pxPerMm = 3.78;
        const scale = 2;
        const effectivePxPerMm = pxPerMm * scale;
  
        const usablePageHeightMm = pageHeight - marginTop - marginBottom;
        const usablePageHeightPx = usablePageHeightMm * effectivePxPerMm;
  
        // Get canvas height in mm and check if it fits the page
        const canvasHeightInMM = canvas.height / effectivePxPerMm;
  
        const imgData = canvas.toDataURL('image/jpeg', 0.9);
        const imgProps = pdf.getImageProperties(imgData);
  
        const imgPdfWidth = pageWidth;
        let imgPdfHeight = (imgProps.height * imgPdfWidth) / imgProps.width;
  
        // If the canvas height is smaller than or equal to the available space, use one page
        if (canvasHeightInMM <= usablePageHeightMm) {
          // Add image to one page
          pdf.addImage(imgData, 'JPEG', 0, marginTop, imgPdfWidth, imgPdfHeight);
        } else {
          // Split the canvas if it's too long for one page
          const totalPages = Math.ceil(canvas.height / usablePageHeightPx);
  
          for (let page = 0; page < totalPages; page++) {
            const sliceCanvas = document.createElement('canvas');
            const sliceContext = sliceCanvas.getContext('2d')!;
            sliceCanvas.width = canvas.width;
            sliceCanvas.height = usablePageHeightPx;
  
            sliceContext.fillStyle = '#fff';
            sliceContext.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
  
            sliceContext.drawImage(
              canvas,
              0,
              page * usablePageHeightPx,
              canvas.width,
              usablePageHeightPx,
              0,
              0,
              canvas.width,
              usablePageHeightPx
            );
  
            const sliceImgData = sliceCanvas.toDataURL('image/jpeg', 0.9);
            const sliceImgProps = pdf.getImageProperties(sliceImgData);
  
            const sliceImgPdfHeight = (sliceImgProps.height * imgPdfWidth) / sliceImgProps.width;
  
            if (page > 0) pdf.addPage(); // Add new page for each slice
  
            // Add sliced image to the PDF
            pdf.addImage(sliceImgData, 'JPEG', 0, marginTop, imgPdfWidth, sliceImgPdfHeight);
          }
        }
  
        // Add footer text at the bottom center on each page
        pdf.setFontSize(9);
        pdf.setTextColor(120); // gray
        pdf.text(footerText, pageWidth / 2, pageHeight - 5, { align: 'center' });
  
        pdf.save(`${docName}.pdf`);
        pdfElement.hidden = true;
      });
    }, 100);
  }
     

  toDateString(date: Date): string {
    return formatDate(date,'MMM d, y. hh:mm a',this.locale);
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
