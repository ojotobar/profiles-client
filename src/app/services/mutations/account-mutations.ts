import { gql } from "apollo-angular";

export const LoginMutation = gql`
  mutation Login($input: LoginUserInput!){
    loginUser(input: $input){
      loginResult{
        accessToken
        message
        successful
      }
    }
  }
`;

export const RegisterMutation = gql`
  mutation RegisterUser($input: RegisterUserInput!){
    registerUser(input: $input){
      accountResult{
        email
        message
        successful
      }
    }
  }
`;

export const AccountConfirmationMutation = gql`
  mutation VerifyAccount($input: VerifyAccountInput!){
    verifyAccount(input: $input){
      accountResult{
          email
          message
          successful
      }
    }
  }
`;

export const ResendConfirmationCodeMutation = gql`
  mutation ResendCode($input: ResendCodeInput!){
    resendCode(input: $input){
      accountResult{
        email
        successful
        message
      }
    }
  }
`;

export const ResetPasswordMutation = gql`
  mutation ResetPassword($input: ResetPasswordInput!){
    resetPassword(input: $input){
      accountResult{
        email
        successful
        message
      }
    }
  }
`;

export const ChangeForgottenPasswordMutation = gql`
  mutation ChangeForgotPassword($input: ChangeForgottenPasswordInput!){
    changeForgottenPassword(input: $input){
      accountResult{
        email
        successful
        message
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