import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
query Characters{
    characters{
      results {
        id
        created
        name
        gender
        image
      },
    },
  }
`;