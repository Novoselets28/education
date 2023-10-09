import { gql } from '@apollo/client';

export const PEOPLE = gql`
query People {
    allPeople {
      people {
        name
        height
        gender
      }
    }
  }
`;