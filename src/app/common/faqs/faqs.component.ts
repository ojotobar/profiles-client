import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { Apollo, gql } from 'apollo-angular';
import { FaqsData, FaqsItemModel } from '../../models/common/faqs-models';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-faqs',
  imports: [
    MatExpansionModule,
    MatPaginatorModule,
    RouterLink
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
        `,})
      .valueChanges.subscribe((result: any) => {
        this.loading = result.loading;
        this.error = result.error;
        let data = (<FaqsData>result.data);
        this.length = data.faqs.totalCount;
        this.faqs = data.faqs.items;
      });
  }
}
