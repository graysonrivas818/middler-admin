import { gql } from '@apollo/client';

export default gql`
query codes($token: String!) {
  codes(token: $token) {
    id,
    type,
    code,
    plan,
    days,
    description,
    expiration,
    createdAt
  }
}`;
