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

export const AddOrUpdateUserLocationMutation = gql`
    mutation AddOrUpdateLocation($input: AddOrUpdateUserLocationInput!){
        addOrUpdateUserLocation(input: $input){
            payload{
                message
                success
            }
        }
    }
`;

export const UpdateProfileDetailsMutation = gql`
    mutation UpdateProfileDetails($input: UpdateProfileDetailsInput!){
        updateProfileDetails(input: $input){
            payload{
                success
                message
            }
        }
    }
`;

export const StatusChangeMutation = gql`
    mutation ChangeStatus($input: ChangeStatusInput!){
        changeStatus(input: $input){
            payload{
                message
                success
            }
        }
    }
`;

export const ChangeRoleMutation = gql`
    mutation ChangeRole($input: ChangeRoleInput!){
        changeRole(input: $input){
            payload{
                message
                success
            }
        }
    }
`;

export const DeleteAccountMutation = gql`
    mutation DeleteAccount($input: DeleteAccountInput!){
        deleteAccount(input: $input){
            payload{
                message
                success
            }
        }
    }
`;

export const DeactivateAccountMutation = gql`
    mutation DeactivateAccount {
        deactivateAccount{
            payload{
                success
                message
            }
        }
    }
`;