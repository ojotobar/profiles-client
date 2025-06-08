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
            otherLevelSpecification
        }
    }
`;

export const GetEducationsQuery = gql`
    query {
        educations{
            id
            institutionName
            major
            level
            levelDescription
            startDate
            endDate
            location{
                city
                state
                country
                longitude
                latitude
            }
            otherLevelSpecification
        }        
    }
`;