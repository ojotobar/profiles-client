import { gql } from "apollo-angular";

export const LoginMutation = gql`
  mutation Login($input: LoginUserInput!){
    loginUser(input: $input){
      loginResult{
        accessToken
        message
        successful
        emailNotConfirmed
      }
    }
  }
`;

export const RegisterMutation = gql`
  mutation RegisterUser($input: RegisterUserInput!){
    registerUser(input: $input){
      payload{
        message
        success
      }
    }
  }
`;

export const AccountConfirmationMutation = gql`
  mutation VerifyAccount($input: VerifyAccountInput!){
    verifyAccount(input: $input){
      payload{
          message
          success
      }
    }
  }
`;

export const ResendConfirmationCodeMutation = gql`
  mutation ResendCode($input: ResendCodeInput!){
    resendCode(input: $input){
      payload{
          message
          success
      }
    }
  }
`;

export const ChangePasswordMutation = gql`
  mutation ChangePassword($input: ChangePasswordInput!){
    changePassword(input: $input){
      payload{
        message
        success   
      }
    }
  }
`;

export const ResetPasswordMutation = gql`
  mutation ResetPassword($input: ResetPasswordInput!){
    resetPassword(input: $input){
      payload{
        message
        success
      }
    }
  }
`;

export const ChangeForgottenPasswordMutation = gql`
  mutation ChangeForgottenPassword($input: ChangeForgottenPasswordInput!){
    changeForgottenPassword(input: $input){
      payload{
        success
        message
      }
    }
  }
`;


export const AddSystemRoleMutation = gql`
  mutation AddRole($input: AddSystemRoleInput!){
    addSystemRole(input: $input){
      payload{
        message
        success
      }
    }
  }
`;

export const UpdateSystemRoleMutation = gql`
  mutation UpdateRole($input: UpdateSystemRoleInput!){
    updateSystemRole(input: $input){
      payload{
        success
        message
      }
    }
  }
`;

export const DeleteSystemRoleMutation = gql`
  mutation DeleteRole($input: DeleteSystemRoleInput!){
    deleteSystemRole(input: $input){
      payload{
        message
        success
      }
    }
  }
`;