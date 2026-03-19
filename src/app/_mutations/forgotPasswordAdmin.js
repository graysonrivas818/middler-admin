import { gql } from '@apollo/client';

export default gql`
mutation forgotPasswordAdmin(
  $email: String!
) {
  forgotPasswordAdmin(
    email: $email
  ) {
    message
  }
}
`;