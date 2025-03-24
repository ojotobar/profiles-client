import { gql } from "apollo-angular";

export const GetEducationQuery = gql`
    query GetEducation($id: UUID!){
        education(id: $id){
            id
            institutionName
            major
            startDate
            endDate
            level
            levelDescription
            location{
            city
            state
            country
            latitude
            longitude
            }
        }
    }
`;