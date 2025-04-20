import { Component, inject } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { AuditLogModel, AuditLogResponseModel } from '../../../models/common/common-models';
import { AlertModel } from '../../../models/common/alert-models';
import { AlertClassEnum, AlertIconEnum } from '../../../enums/alert-enums';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuditActionEnum } from '../../../enums/audit-action-enum';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AlertComponent } from '../../common/alert/alert.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { TitlecasedPipe } from '../../../pipes/titlecased.pipe';

@Component({
  selector: 'app-audit-logs',
  imports: [
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    AlertComponent,
    MatPaginatorModule,
    MatOptionModule,
    MatSelectModule,
    DatePipe,
    TitlecasedPipe
  ],
  templateUrl: './audit-logs.component.html',
  styles: ``
})
export class AuditLogsComponent {
  loading: boolean = false;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions = [5, 10, 20, 50];
  length: number = 0;
  form!: FormGroup;
  statuses = Object.values(AuditActionEnum);
  alert = new AlertModel();
  auditLogs: AuditLogModel[] = [];
  error!: Error;
  appService = inject(AppService);

  constructor(private readonly fb: FormBuilder){
    this.form = this.fb.group({
      search: [''],
      action: [null]
    })
  }

  ngOnInit() {
    this.getAuditLogs();
  }

  getAuditLogs(){
    const form = this.form.value;
    const search = form.search as string | null;
    const action = form.action as AuditActionEnum | null;
    this.loading = true;
    this.appService.getAuditLogsObservables(search, action, this.pageIndex, this.pageSize)
      .valueChanges
      .subscribe({
        next: (data) => {
          this.loading = <boolean>data.loading;
          const result = <AuditLogResponseModel>data.data.auditLogs;
          if(result){
            this.length = result.totalCount;
            this.auditLogs = result.items;
            if(this.auditLogs.length <= 0){
              this.alert = this.appService.mapAlertMessage(this.alert, 'No record',
                'No record found for this search', AlertIconEnum.info, AlertClassEnum.info);
            }
          } else {
            this.alert = this.appService.mapAlertMessage(this.alert, 'Something went wrong',
              'An error occurred while trying to get your the data. Please try again.', AlertIconEnum.info, AlertClassEnum.info);
          }
        },
        error: (error: Error) => {
          this.loading = false;
          this.error = error;
          this.alert = this.appService.mapAlertMessage(this.alert, 'Something went wrong',
            'An error occurred while trying to get your the data. Please try again.', AlertIconEnum.info, AlertClassEnum.info);
        }
      })
  }

  clearSearch(){
    if(this.form.value.search || this.form.value.action){
      this.form.patchValue({ search: '', action: null })
      this.getAuditLogs();
    }
  }

  handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  SearchAudits() {
    this.getAuditLogs();
  }
}
