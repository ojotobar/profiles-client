import { gql } from "apollo-angular";

export const AddCareerSummaryMutation = gql`
    mutation AddCareerSummary($input: AddProfessionalSummaryInput!){
        addProfessionalSummary(input: $input){
            payload{
                success
                message
            }
        }
    }
`;

export const UpdateCareerSummaryMutation = gql`
    mutation UpdateCareerSummary($input: UpdateCareerSummaryInput!){
        updateCareerSummary(input: $input){
            payload{
                message
                success
            }
        }
    }
`;

export const DeleteCareerSummaryMutation = gql`
  mutation DeleteCareerSummary($input: DeleteCareerSummaryInput!){
    deleteCareerSummary(input: $input){
        payload{
            message
            success
        }
    }
}
`;