import { gql } from "apollo-angular";

export const GetCertificationsQuery = gql`
    query {
        certifications{
            id
            institution
            name
            dateObtained
            expires
            link
        }
    }
`;

export const GetCertificationByIdQuery = gql`
    query GetCertificationById($id: UUID!){
        certification(id: $id){
            id
            name
            institution
            link
            dateObtained
            expires
            yearsOfValidity
        }
    }
`;