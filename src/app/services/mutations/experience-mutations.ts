import { gql } from "apollo-angular";

export const AddExperienceMutation = gql`
    mutation AddExperience($input: AddExperiencesInput!){
        addExperiences(input: $input){
            payload{
                message
                success
            }
        }
    }
`;

export const DeleteExperienceMutation = gql`
    mutation DeleteExperience($input: DeleteExperienceInput!){
        deleteExperience(input: $input){
            payload{
                message
                success
            }
        }
    }
`;

export const UpdateExperienceMutation = gql`
    mutation UpdateExperience($input: UpdateExperienceInput!){
        updateExperience(input: $input){
            payload{
                message
                success
            }
        }
    }
`;

// Types declarations
type Location = {
    city: string;
    country: string;
};

type InputData = {
    organization: string;
    title: string;
    startDate: string;
    endDate: string;
    location: Location;
};

type ResponseData = {
    input: {
        id: string;
        input: InputData;
    };
};