import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { Apollo, gql } from 'apollo-angular';
import { FaqsData, FaqsItemModel } from '../../models/common/faqs-models';
import { RouterLink } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AlertComponent } from '../alert/alert.component';
import { AlertModel } from '../../models/common/alert-models';
import { AlertClassEnum, AlertIconEnum } from '../../enums/alert-enums';


@Component({
  selector: 'app-faqs',
  imports: [
    MatExpansionModule,
    MatPaginatorModule,
    RouterLink,
    MatProgressSpinnerModule,
    AlertComponent
    ],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss'
})
export class FaqsComponent {
  length: number = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50];
  faqs: FaqsItemModel[] = [];
  loading = true;
  error: any;
  alertHeader = 'An error occurred!';
  alertMessage = 'An error occurred why getting the data. Please try again later.';
  alertIcon = AlertIconEnum.danger;
  alertBg = AlertClassEnum.danger;

  constructor(private readonly apollo: Apollo) { }

  ngOnInit(){
    this.getData(this.pageIndex * this.pageSize, this.pageSize)
  }

  handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getData(this.pageIndex * this.pageSize, this.pageSize)
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  getData(skip: number, take: number){
    this.apollo
      .watchQuery({
        query: gql`
          query GetFaqs{
            faqs(skip: ${skip}, take: ${take}) {
              items{
                id
                title
                content
                isDeprecated
              },
            pageInfo{
              hasNextPage
              hasPreviousPage
            },
            totalCount
          }
        }
      `})
      .valueChanges.subscribe({
        next: (data: any) => {
          this.loading = (<boolean>data.loading);
          let Data = (<FaqsData>data.data);
          this.length = Data.faqs.totalCount;
          this.faqs = Data.faqs.items;
          if(this.faqs.length <= 0){
            this.alertBg = AlertClassEnum.info;
            this.alertIcon = AlertIconEnum.info;
          }
        },
        error: (error: Error) => {
          this.alertHeader = 'An error occurred!'
          this.alertMessage = 'An error occurred while getting the data. Please try again later.'
        }
      });
  }
}
