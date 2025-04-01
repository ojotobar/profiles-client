import { gql } from "apollo-angular";

export const GetProfileQuery = gql`
    query{
        profile{
            id
            firstName
            lastName
            otherName
            gender
            email
            phoneNumber
            photoUrl
            cvUrl
            isDeprecated
            updatedOn
            createdOn
            deactivatedOn
            status
            firstName
            lastLogin
            location{
                line1
                line2
                postalCode
                city
                state
                country
                longitude
                latitude
            }
        }
    }
`;

export const GetProfileSummaryQuery = gql`
    query{
        userSummary{
            education
            experience
            skills
            projects
            certifications
            hasCareerSummary
            progress
            canGenerateApiKey,
            apiKey
        }
    }
`;