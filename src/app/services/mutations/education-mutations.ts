import { gql } from "apollo-angular";

export const AddEducationMutations = gql`
    mutation AddEducation($input: AddEducationInput!){
        addEducation(input: $input){
            payload{
                message
                success
            }
        }
    }
`;

export const DeleteEducationMutation = gql`
    mutation DeleteEducation($input: DeleteEducationInput!){
        deleteEducation(input: $input){
            payload{
                message
                success
            }
        }
    }
`;

export const UpdateEducationMutation = gql`
    mutation UpdateEducation($input: UpdateEducationInput!){
        updateEducation(input: $input){
            payload{
                message
                success
            }
        }
    }
`;