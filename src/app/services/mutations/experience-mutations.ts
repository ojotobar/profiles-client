import { gql } from "apollo-angular";

export const AddExperienceMutation = gql`
    mutation AddExperience($input: AddExperiencesInput!){
        addExperiences(input: $input){
            experiencesPayload{
            message
            success
            }
        }
    }
`;

// {
//     "input": {
//       "inputs": [
//         {
//           "organization": "",
//           "title": "",
//           "startDate": "",
//           "endDate": "",
//           "summaries": [
  
//           ],
//           "location": {
//             "city": "",
//             "country": ""
//           }
//         }
//       ]
//     }
//   }