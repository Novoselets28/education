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

export const CREATE_PERSON = gql`
  mutation CreatePerson($input: PersonInput!) {
    createPerson(input: $input) {
      id
      name
      height
      gender
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: ID!, $name: String, $height: Float, $gender: String) {
    updatePerson(id: $id, name: $name, height: $height, gender: $gender) {
      id
      name
      height
      gender
    }
  }
`;

export const DELETE_PERSON = gql`
  mutation DeletePerson($id: ID!) {
    deletePerson(id: $id)
  }
`;


