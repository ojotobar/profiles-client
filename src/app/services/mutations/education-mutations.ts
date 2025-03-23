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