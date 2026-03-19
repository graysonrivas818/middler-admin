import { gql } from '@apollo/client';

export default gql`
mutation createPromotion(
  $token: String!,
  $type: String!,
  $code: String!,
  $plan: String!,
  $days: String!,
  $description: String!,
  $affiliate: String
) {
  createPromotion(
    token: $token,
    type: $type,
    code: $code,
    plan: $plan,
    days: $days,
    description: $description,
    affiliate: $affiliate
  ) {
    message
  }
}
`;
