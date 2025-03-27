import { gql } from "apollo-angular";

export const AddProjectsMutation = gql`
    mutation AddProject($input: AddProjectsInput!){
        addProjects(input: $input){
            projectsPayload{
                success
                message
            }
        }
    }
`;

export const UpdateProjectMutation = gql`
    mutation UpdateProject($input: UpdateProjectInput!){
        updateProject(input: $input){
            projectPayload{
                success
                message
            }
        }
    }
`;

export const DeleteProjectMutation = gql`
    mutation DeleteProject($input: DeleteProjectInput!){
        deleteProject(input: $input) {
            projectPayload{
                success
                message
            }
        }
    }
`;