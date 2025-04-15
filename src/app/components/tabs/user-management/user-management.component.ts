import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileModel, ProfilesInputModel, ProfilesResponseModel } from '../../../models/profile/profile-models';
import { ProfileService } from '../../../services/profile.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { AppService } from '../../../services/app.service';
import { AlertModel } from '../../../models/common/alert-models';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertComponent } from '../../common/alert/alert.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AlertClassEnum, AlertIconEnum } from '../../../enums/alert-enums';
import { getGenericErrorMessage } from '../../../models/common/common-models';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';
import { DatePipe } from '@angular/common';
import { InitialsPipe } from '../../../pipes/initials.pipe';
import { TitlecasedPipe } from '../../../pipes/titlecased.pipe';
import { CustomDatePipe } from '../../../pipes/custom-date.pipe';
import { UserStatusEnum } from '../../../enums/status-enum';
import { DialogService } from '../../../services/dialog.service';
import { MatDialogData } from '../../../models/common/snackbar-model';

@Component({
  selector: 'app-user-management',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    AlertComponent,
    MatPaginatorModule,
    DatePipe,
    InitialsPipe,
    TitlecasedPipe,
    CustomDatePipe
  ],
  templateUrl: './user-management.component.html',
  styles: ``
})
export class UserManagementComponent {
  searchUsers!: FormGroup;
  loading: boolean = false;
  error!: Error;
  pageSize = 10;
  pageIndex = 0;
  length: number = 0
  pageSizeOptions = [10, 25, 50];
  alert = new AlertModel();
  profiles: ProfileModel[] = [];
  query = this.getDefaultSearchInputs();

  constructor(private readonly fb: FormBuilder, private readonly profileService: ProfileService, 
    public readonly appService: AppService, private readonly dialogService: DialogService){
      this.searchUsers = this.fb.group({
        search: [''],
        status: [null],
        confirmed: [false],
        gender: [null],
        premium: [false]
      });
  }

  ngOnInit() {
    this.getProfiles();
  }

  getProfiles(){
    this.loading = true;
    this.profileService.getProfiles(this.query, this.pageIndex * this.pageSize, this.pageSize)
      .valueChanges
      .subscribe({
        next: (data) => {
          this.loading = (<boolean>data.loading);
          let result = (<ProfilesResponseModel>data.data.users);
          if(result){
            this.profiles = result.items;
            this.length = result.totalCount;
            if(this.profiles.length <= 0){
              this.alert = this.appService.mapAlertMessage(this.alert, 'No record', 'No user record found!', 
                AlertIconEnum.info, AlertClassEnum.info);
            }
          }else {
            this.alert = this.appService.mapAlertMessage(this.alert, 'Something went wrong', getGenericErrorMessage(OperationTypeEnum.getMany), 
              AlertIconEnum.danger, AlertClassEnum.danger)
          }
        },
        error: (error: Error) => {
          this.error = error;
          this.loading = false;
          this.alert = this.appService.mapAlertMessage(this.alert, 'Something went wrong', getGenericErrorMessage(OperationTypeEnum.getMany), 
            AlertIconEnum.danger, AlertClassEnum.danger)
        }
      })
  }

  handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  SearchUsers() {
    this.query = <ProfilesInputModel>this.searchUsers.value;
    this.getProfiles();
  }

  getDefaultSearchInputs(): ProfilesInputModel{
    const input: ProfilesInputModel = {
      search: null,
      premium: null,
      confirmed: null,
      gender: null,
      status: null
    };
    return input;
  }

  getStatusColor(status: UserStatusEnum): string {
    switch(status){
      case UserStatusEnum.Active:
        return 'success';
      case UserStatusEnum.Inactive:
        return 'warning';
      case UserStatusEnum.Suspended:
        return 'danger';
    }
  }

  clearSearch(){
    this.query = this.getDefaultSearchInputs();
    this.searchUsers.patchValue(this.query)
    this.getProfiles();
  }

  openRoleChangeDialog(email: string, name: string){
      if(email && name){
        let ref = this.dialogService.openRoleChangeDialog(email, name)
        ref.afterClosed().subscribe(result => {
          let res = (<MatDialogData>result);
          if(res.refresh){
            this.getProfiles()
          }
        })
      }
  }

  openStatusChangeDialog(email: string, name: string){
    if(email && name){
      let ref = this.dialogService.openStatusChangeDialog(email, name)
      ref.afterClosed().subscribe(result => {
        let res = (<MatDialogData>result);
        if(res.refresh){
          this.getProfiles()
        }
      })
    }
  }

  openDeleteUserDialog(id: string, name: string){
    if(id && name){
      let ref = this.dialogService.openDeleteUserDialog(id, name)
      ref.afterClosed().subscribe(result => {
        let res = (<MatDialogData>result);
        if(res.refresh){
          this.getProfiles()
        }
      })
    }
  }
}
