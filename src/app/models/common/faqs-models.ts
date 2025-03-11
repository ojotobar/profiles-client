export interface FaqsData {
    faqs: {
      items: FaqsItemModel[],
      pageInfo: {
        hasNextPage: boolean,
        hasPreviousPage: boolean
      },
      totalCount: number
    }
}

export interface FaqsItemModel{
    id: string,
    title: string,
    content: string,
    isDeprecated: boolean
}

