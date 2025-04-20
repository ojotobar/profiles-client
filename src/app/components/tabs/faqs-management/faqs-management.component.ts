import { Component, inject } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { FaqsData, FaqsItemModel } from '../../../models/common/faqs-models';
import { AlertModel } from '../../../models/common/alert-models';
import { AlertClassEnum, AlertIconEnum } from '../../../enums/alert-enums';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertComponent } from '../../common/alert/alert.component';
import { DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { DialogService } from '../../../services/dialog.service';
import { MatDialogData } from '../../../models/common/snackbar-model';

@Component({
  selector: 'app-faqs-management',
  imports: [
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    AlertComponent,
    MatPaginatorModule,
    DatePipe,
    MatSelectModule,
    MatOptionModule,
    TruncatePipe
  ],
  templateUrl: './faqs-management.component.html',
  styles: ``
})
export class FaqsManagementComponent {
  loading: boolean = false;
  appService = inject(AppService);
  faqs: FaqsItemModel[] = [];
  pageSize: number = 10;
  pageIndex: number = 0;
  length: number = 0;
  error!: Error;
  form!: FormGroup;
  pageSizeOptions = [10, 25, 50]
  search!: string | null;
  alert = new AlertModel();
  dialogService = inject(DialogService);

  constructor(private readonly fb: FormBuilder){
    this.form = this.fb.group({
      search: ['']
    })
  }

  ngOnInit(){
    this.getData(this.pageIndex, this.pageSize, this.search)
  }

  getData(skip: number, take: number, search: string | null){
      this.loading = true;
      this.appService.getFaqsObservable(search, skip, take)
        .valueChanges.subscribe({
          next: (data: any) => {
            this.loading = (<boolean>data.loading);
            let Data = (<FaqsData>data.data);
            this.length = Data.faqs.totalCount;
            this.faqs = Data.faqs.items;
            if(this.faqs.length <= 0){
              this.alert = this.appService.mapAlertMessage(this.alert,
                'No record!', 'No FAQs record found. Please check back later', AlertIconEnum.info,
                AlertClassEnum.info
              )
            }
          },
          error: (error: Error) => {
            this.loading = false;
            this.alert = this.appService.mapAlertMessage(this.alert,
              'An error occurred!', 'An error occurred why getting the data. Please try again later.', 
              AlertIconEnum.danger, AlertClassEnum.danger
            )
          }
      });
  }

  handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.search = this.form.value.search as string | null;
    this.getData(this.pageIndex * this.pageSize, this.pageSize, this.search)
  } 

  clearSearch() {
    this.search = this.form.value.search as string | null;
    this.getData(this.pageIndex * this.pageSize, this.pageSize, this.search)
  }

  Search() {
    this.search = this.form.value.search as string | null;
    this.getData(this.pageIndex * this.pageSize, this.pageSize, this.search)
  }

  openAddFaqDialog(name: string){
      let dialogRef = this.dialogService.openAddFaqsDialog(name);
      dialogRef.afterClosed().subscribe(result => {
        let response = (<MatDialogData>result);
        if(response.refresh){
          this.search = this.form.value.search as string | null;
          this.getData(this.pageIndex * this.pageSize, this.pageSize, this.search);
        }
      });
  }

  openUpdateFaqDialog(id: string){
    let dialogRef = this.dialogService.openUpdateFaqsDialog(id);
    dialogRef.afterClosed().subscribe(result => {
      let response = (<MatDialogData>result);
      if(response.refresh){
        this.search = this.form.value.search as string | null;
        this.getData(this.pageIndex * this.pageSize, this.pageSize, this.search);
      }
    });
  }

  openDeleteFaqDialog(id: string, name: string){
    let dialogRef = this.dialogService.openDeleteFaqsDialog(id, name);
    dialogRef.afterClosed().subscribe(result => {
      let response = (<MatDialogData>result);
      if(response.refresh){
        this.search = this.form.value.search as string | null;
        this.getData(this.pageIndex * this.pageSize, this.pageSize, this.search);
      }
    });
  }
}
