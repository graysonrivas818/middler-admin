import { gql } from '@apollo/client';

export default gql`
mutation updatePasswordAdmin(
  $newPassword: String!, 
  $id: String!, 
  $token: String!
) {
  updatePasswordAdmin(
    newPassword: $newPassword, 
    id: $id, 
    token: $token
  ) {
    message
  }
}
`;