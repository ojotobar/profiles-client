import { gql } from "apollo-angular";

export const AddOrUpdateLegalDocumentMutation = gql`
    mutation AddOrUpdateDocument($input: AddOrUpdateDocumentInput!){
        addOrUpdateDocument(input: $input){
            legalDocuments{
                id
                document
                type
                updatedOn
                typeDescription
            }
        }
    }
`;