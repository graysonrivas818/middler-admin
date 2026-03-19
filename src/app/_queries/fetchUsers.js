import { gql } from '@apollo/client';

export default gql`
query users($token: String!) {
  users(token: $token) {
    id
    firstName
    lastName
    email
    password
    membershipID
    bio
    emailVerified
    emailVerifiedStamp
    role
    businessLogo
    businessName
    estimatorName
    businessAddress
    businessPhone
    businessEmail
    businessWebsite
    businessLicenseNumber
    businessInstagram
    subscribed
    customerID
    subscriptionID
    subscribedAt
    currentPeriodStart
    currentPeriodEnd
    paymentPlan
    createdAt
    clients {
      id
      clientName
      clientPhone
      clientPropertyAddress
      clientEmail
      clientZipCode
      interiorSquareFeet
      interiorCondition
      interiorDetail
      interiorItems {
        id
        type
        title
      }
      interiorIndividualItems {
        title
        price
        gallons
      }
      interiorEstimate
      interiorGallons
      interiorGallonsCost
      interiorGallonsItems {
        type
        gallons
      }
      doorsAndDrawers
      insideCabinet
      cabinetCondition
      cabinetDetail
      cabinetEstimate
      cabinetGallons
      cabinetGallonsCost
      exteriorSquareFeet
      exteriorCondition
      exteriorDetail
      exteriorItems {
        id
        type
        title
      }
      exteriorIndividualItems {
        title
        price
        gallons
      }
      exteriorEstimate
      exteriorGallons
      exteriorGallonsCost
      exteriorGallonsItems {
        type
        gallons
      }
      painters
      hoursPerDay
      days
      paintBrand
      paintQuality
      warranty
      payments
      deposit
      depositType
      painterTapeRolls
      plasticRolls
      dropCloths
      adjustment
      adjustments {
        interiorAdjusted
        cabinetAdjusted
        exteriorAdjusted
        dateAdjusted
      }
      notesAndDisclosure
      userType
      createdAt
    }
    payments {
      id
      userID
      userEmail
      orderID
      subscriptionID
      paymentPlan
      paymentIntent
      invoiceHostedUrl
      invoicePdf
      invoices {
        invoiceID
        invoiceHostedUrl
        invoicePdf
      }
      subscriptionStatus
    }
    codes {
      type
      code
      plan
      days
      description
      expiration
    }
  }
}`;
