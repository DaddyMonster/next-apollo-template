import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  QueryOptions,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { GetServerSideProps, GetStaticProps, NextPageContext } from "next";
import merge from "deepmerge";
import { useMemo } from "react";
import { AppProps } from "next/app";
const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  credentials: "include",
});

// ## 아폴로 Subscription (웹소켓) 기능을 사용할 경우 아래 링크를 사용

/* const splitLink = process.browser
  ? new RetryLink().split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          Boolean(wsLink) &&
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink!,
      uploadLink
    )
  : uploadLink; */

let apolloClient: ApolloClient<NormalizedCacheObject>;
const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

function createApolloClient(ctx?: NextPageContext) {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: uploadLink,
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null
) {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (initialState) {
    const existingCache = _apolloClient.extract();
    const data = merge(initialState, existingCache);
    _apolloClient.cache.restore(data);
  }
  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function addApolloState(client: typeof apolloClient, pageProps: any) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: AppProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}

export const createStaticProps = async (
  docs: QueryOptions[],
  revalidate = 30
): Promise<GetStaticProps> => {
  const apolloClient = initializeApollo();
  await Promise.all(docs.map(async (x) => await apolloClient.query(x)));
  return addApolloState(apolloClient, {
    props: {},
    revalidate,
  });
};

export const createServerSideProps = async (
  docs: QueryOptions[]
): Promise<GetServerSideProps> => {
  const apolloClient = initializeApollo();
  await Promise.all(docs.map(async (x) => await apolloClient.query(x)));
  return addApolloState(apolloClient, {
    props: {},
  });
};

export default useApollo;
