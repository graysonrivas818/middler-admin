import { gql } from '@apollo/client';

export default gql`
mutation ResetAllEstimates($token: String) {
  resetAllEstimates(token: $token) {
    message
  }
}
`;
