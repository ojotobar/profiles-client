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