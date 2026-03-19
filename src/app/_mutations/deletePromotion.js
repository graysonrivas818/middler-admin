import { gql } from '@apollo/client';

export default gql`
mutation deletePromotion(
  $id: String!,
  $token: String!
) {
  deletePromotion(
    id: $id,
    token: $token
  ) {
    message
  }
}
`;
