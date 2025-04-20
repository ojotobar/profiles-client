import { gql } from "apollo-angular";

export const AddFaqsMutation = gql`
    mutation AddFaq($input: AddFaqInput!){
        addFaq(input: $input){
            payload{
                message
                success
            }
        }
    }
`;

export const UpdateFaqsMutation = gql`
    mutation UpdateFaq($input: UpdateFaqInput!){
        updateFaq(input: $input){
            payload{
                message
                success
            }
        }
    }
`;

export const DeleteFaqsMutation = gql`
    mutation DeleteFaq($input: DeleteFaqInput!){
        deleteFaq(input: $input){
            payload{
                message
                success
            }
        }
    }
`;