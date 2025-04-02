import { gql } from "apollo-angular";

export const UploadResumeMutation = gql`
    mutation UploadResume($input: UploadResumeInput!){
        uploadResume(input: $input){
            payload{
                message
                success
            }
        }
    }
`;

export const UploadProfilePhotoMutation = gql`
    mutation UploadPhoto($input: UploadProfilePhotoInput!){
        uploadProfilePhoto(input: $input){
            payload{
                message
                success
            }
        }
    }
`;