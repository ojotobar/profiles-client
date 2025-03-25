import { gql } from "apollo-angular";

export const GetExperiencesQuery = gql`
    query {
        experiences{
            id
            userId
            organization
            jobTitle
            accomplishments
            isDeprecated
            startDate
            endDate
            location{
            city
            state
            country
            longitude
            latitude
            }
        }
    }
`;

export const GetExperienceByIdQuery = gql`
    query GetExperienceById($id: UUID!){
        experience(id: $id){
            id
            organization
            jobTitle
            startDate
            endDate
            accomplishments
            location{
            city
            country
        }
    }
}
`;