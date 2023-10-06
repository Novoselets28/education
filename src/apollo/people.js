import { gql } from '@apollo/client';

export const PEOPLE = gql`
    query GetPeople {
        allPeople {
        people {
            name
            height
            hairColor
            }
        }
    }
`;
