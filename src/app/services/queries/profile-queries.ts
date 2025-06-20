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
            socialMedia{
                name
                link
                type
                iconName
            }
        }
    }
`;

export const GetSocialMediaQuery = gql`
    query {
        socialMedia{
            success
            socialMedia{
                name
                iconName
                link
                type
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

export const GenerateApiKeyQuery = gql`
    query {
        apiKey{
            apiKey
            message
            success
        }
    }
`;

export const GetProfilesQuery = gql`
    query GetUsers($search: UserFilterInput!, $skip: Int, $take: Int){
        users(search: $search, skip: $skip, take: $take){
            items{
                id
                firstName
                lastName
                otherName
                lastLogin
                status
                gender
                email
                phoneNumber
                emailConfirmed
                photoUrl
                cvUrl
                createdOn
                updatedOn
                role
                deactivatedOn
                isDeprecated
            }
            pageInfo{
                hasNextPage
                hasPreviousPage
            }
            totalCount
    }
}
`;

export const GetDetailedProfileQuery = gql`
    query {
        detailedProfile{
            profile{
                id
                firstName
                lastName
                otherName
                gender
                email
                emailConfirmed
                phoneNumber
                photoUrl
                cvUrl
                createdOn
                status
                isDeprecated
                deactivatedOn
                lastLogin
                updatedOn
                location{
                    line1
                    line2
                    city
                    postalCode
                    state
                    country
                    longitude
                    latitude
                }
                socialMedia{
                    name
                    link
                    type
                    iconName
                }
            }
            profileSummary{
                skills
                hasCareerSummary
                projects
                progress
                certifications
                canGenerateApiKey
                education
                experience
                apiKey
            }
        }
    }
`;