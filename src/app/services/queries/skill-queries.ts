import { gql } from "apollo-angular";

export const GetSkillsQuery = gql`
    query GetSkills {
        skills {
            id
            userId
            name
            level
            levelDescription
            yearsOfExperience
            certified
        }
    }
`;

export const GetSkillQuery = gql`
    query GetSkill($id: UUID!){
        skill(id: $id){
            id
            userId
            name
            level
            yearsOfExperience
            levelDescription
            certified
        }
    }
`;