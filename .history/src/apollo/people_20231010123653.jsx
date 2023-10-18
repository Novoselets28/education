import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
query Characters{
    characters{
      results {
        created
        name
        gender
        image
      },
    },
  }
`;