import { gql } from '@apollo/client';

export default gql`
mutation adminDeleteUser(
  $id: String!,
  $token: String!
) {
  adminDeleteUser(
    id: $id,
    token: $token
  ) {
    message
  }
}
`;
