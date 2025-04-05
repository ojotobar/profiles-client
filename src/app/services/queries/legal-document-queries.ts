import { gql } from "apollo-angular";

export const GetLegalDocumentQuery = gql`
    query GetDocument($type: ELegalDocumentType!){
        legalDocument(type: $type){
            id
            document
            type
            typeDescription
            updatedOn
        }
    }
`;