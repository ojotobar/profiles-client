import { gql } from "apollo-angular";

export const GetAuditLogsFilterQuery = gql`
  query GetAudits($input: AuditLogFilterInput!, $skip: Int, $take: Int){
    auditLogs(search: $input, skip: $skip, take: $take){
      items{
        id
        userId
        performedBy
        actionId
        action
        ipAddress
        platform
        createdOn
      }
      pageInfo{
        hasPreviousPage
        hasNextPage
      }
      totalCount
    }
  }`
;

export const GetFaqsQuery = gql`
    query GetFaqs($search: String, $skip: Int, $take: Int) {
      faqs(search: $search, skip: $skip take: $take){
        items{
          id
          title
          content
          isDeprecated
          createdOn
          updatedOn
        }
        pageInfo{
          hasNextPage
          hasPreviousPage
        }
        totalCount
      }
    }
  `;

  export const GetFaqQuery = gql`
    query GetFaq($id: UUID!){
      faq(id: $id){
        id
        title
        content
        createdOn
        updatedOn
        isDeprecated
      }
    }
  `;

  export const GetAvailableTagsQuery = gql`
    query {
      portfolioVersions{
        id
        name
        oldVersion
        latestVersion
        createdOn
        updatedOn
        isPremium
        isDeprecated
      }
    }
  `;