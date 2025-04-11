import { gql } from "apollo-angular";

export const AddCertificationsMutation = gql`
    mutation AddCertifications($input: AddCertificationsInput!){
        addCertifications(input: $input){
            payload{
                message
                success
            }
        }
    }
`;

export const UpdateCertificationMutation = gql`
    mutation UpdateCertification($input: UpdateCertificationInput!){
        updateCertification(input: $input){
            payload{
                message
                success
            }
        }
    }
`;

export const DeleteCertificationMutation = gql`
    mutation DeleteCertification($input: DeleteCertificationInput!){
        deleteCertification(input: $input){
            payload{
                message
                success
            }
        }
    }
`;