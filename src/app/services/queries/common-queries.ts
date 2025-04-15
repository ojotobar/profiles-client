import { gql } from "apollo-angular";

export const GetAuditLogsFilterQuery = gql`
  query GetAudits($input: AuditLogFilterInput!, $skip: Int, $take: Int){
    auditLogs(search: $input, skip: $skip, take: $take){
      items{
        id
        userId
        performedBy
        performedOn
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

export const GetAuditLogsQuery = function(skip: number, take: number, search: string | null = ""){
  return gql`
    query {
      auditLogs(search: ${search} skip: ${skip} take: ${take}){
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
    }`;
}

export const GetFaqsQuery = function(){
  return gql`
    query GetFaqs($search: String, $skip: Int, $take: Int) {
      faqs(search: $search, skip: $skip take: $take){
        items{
          id
          title
          content
          isDeprecated
        }
        pageInfo{
          hasNextPage
          hasPreviousPage
        }
        totalCount
      }
    }
  `;
}