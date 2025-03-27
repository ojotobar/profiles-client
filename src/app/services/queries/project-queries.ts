import { gql } from "apollo-angular";

export const GetProjectsQuery = gql`
    query {
        projects{
            id
            name
            link
            description
            technologies
        }
    }
 `;

 export const GetProjectQuery = gql`
    query GetProject($id: UUID!){
        project(id: $id){
            id
            name
            description
            technologies
            link
        }
    }
 `;