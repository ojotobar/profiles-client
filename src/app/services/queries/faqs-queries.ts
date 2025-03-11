import { gql } from "apollo-angular";

export const FaqsPagedQuery = gql`
{
  rates(currency: "USD") {
    currency
    rate
  }
}
`;