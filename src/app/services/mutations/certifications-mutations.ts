import { gql } from "apollo-angular";

export const AddCertificationsMutation = gql`
    mutation AddCertifications($input: AddCertificationsInput!){
        addCertifications(input: $input){
            certificationsPayload{
                success
                message
            }
        }
    }
`;

export const UpdateCertificationMutation = gql`
    mutation UpdateCertification($input: UpdateCertificationInput!){
        updateCertification(input: $input){
            certificationPayload{
                success
                message
            }
        }
    }
`;

export const DeleteCertificationMutation = gql`
    mutation DeleteCertification($input: DeleteCertificationInput!){
        deleteCertification(input: $input){
            certificationPayload{
                success
                message
            }
        }
    }
`;