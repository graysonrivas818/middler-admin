"use client";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  SuspenseCache
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";

const GRAPHQL_ENDPOINT =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_GRAPHQL_DEVELOPMENT_ENDPOINT || "https://api.middler.com/graphql"
    : process.env.NEXT_PUBLIC_GRAPHQL_PRODUCTION_ENDPOINT || "https://api.middler.com/graphql";

function makeClient() {
  const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    headers: {"Apollo-Require-Preflight": "true"}
  });

  const uploadLink = new ApolloLink((operation, forward) => {
    if (operation.variables && operation.variables.file) {
      const formData = new FormData();
      formData.append('file', operation.variables.file);
      operation.setContext({
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
    }
    return forward(operation);
  });

  return new NextSSRApolloClient({
    ssrMode: typeof window === 'undefined',
    cache: new NextSSRInMemoryCache({
      include: 'active'
    }),
    dataIdFromObject: o => o.id,
    link: ApolloLink.from([uploadLink, httpLink])
  });
}

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider
      makeClient={makeClient}
    >
      {children}
    </ApolloNextAppProvider>
  );
}
