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