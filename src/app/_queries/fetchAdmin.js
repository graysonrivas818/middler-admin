import { gql } from '@apollo/client';

export default gql`
query Admin($id: ID!, $token: String!) {
  admin(id: $id, token: $token){
    id,
    firstName,
    lastName,
    email,
    password,
    membershipID,
    role
  }
}`