import { gql } from "apollo-angular";

export const AddSkillsMutation = gql`
    mutation AddSkills($inputs: AddSkillsInput!){
        addSkills(input: $inputs){
            payload{
                success
                message
            }
        }
    }
`;

export const UpdateSkillsMutation = gql`
    mutation UpdateSkill($input: UpdateSkillInput!){
        updateSkill(input: $input){
            payload{
                success
                message
            }
        }
    }
`;

export const DeleteSkillsMutation = gql`
    mutation DeleteSkill($input: DeleteSkillInput!){
        deleteSkill(input: $input){
            payload{
                success
                message
            }
        }
    }
`;