import { gql } from "apollo-angular";

export const GetSystemRolesQuery = gql`
  query {
    systemRoles{
      id
      name
      users
    }
  }
`;