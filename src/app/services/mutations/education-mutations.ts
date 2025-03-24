import { gql } from "apollo-angular";

export const AddEducationMutations = gql`
    mutation AddEducation($input: AddEducationInput!){
        addEducation(input: $input){
            educationResult{
                education{
                    id
                }
                success
                message
            }
        }
    }
`;

export const DeleteEducationMutation = gql`
    mutation DeleteEducation($input: DeleteEducationInput!){
        deleteEducation(input: $input){
            educationResult{
            message
            success
            }
        }
    }
`;

export const UpdateEducationMutation = gql`
    mutation UpdateEducation($input: UpdateEducationInput!){
        updateEducation(input: $input){
            educationResult{
            success
            message
            }
        }
    }
`;