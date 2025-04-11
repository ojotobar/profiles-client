import { gql } from "apollo-angular";

export const AddProjectsMutation = gql`
    mutation AddProject($input: AddProjectsInput!){
        addProjects(input: $input){
            payload{
                message
                success
            }
        }
    }
`;

export const UpdateProjectMutation = gql`
    mutation UpdateProject($input: UpdateProjectInput!){
        updateProject(input: $input){
            payload{
                message
                success
            }
        }
    }
`;

export const DeleteProjectMutation = gql`
    mutation DeleteProject($input: DeleteProjectInput!){
        deleteProject(input: $input) {
            payload{
                message
                success
            }
        }
    }
`;