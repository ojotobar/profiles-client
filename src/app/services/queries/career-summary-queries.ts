import { gql } from "apollo-angular";

export const CareerSummaryByIdQuery = gql`
    query GetSummaryById($id: UUID!){
        professionalSummaryById(id: $id){
            id
            summary
            userId,
            heading
        }
    }
`;

export const CareerSummaryByUserQuery = gql`
    query{
        professionalSummary{
            id
            userId
            summary
            heading
        }
    }
`;