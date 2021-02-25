import { NextComponentType, NextPageContext } from "next";
import { AppProps } from "next/app";
import Layouts from "../app-layout";
import { MyPageType } from "../types/AppPageType";
import "../styles/global/font.css";
import "../styles/global/index.css";
import useApollo from "../lib/ApolloNext";
import React from "react";
import Head from "next/head";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider as MuiThMuiThemeProvider,
} from "@material-ui/core";
import { ApolloProvider } from "@apollo/client";
import defaultTheme from "../styles/overrides/theme.override";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

interface MyAppProps extends AppProps {
  Component: NextComponentType<NextPageContext, any, {}> & MyPageType;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const apolloClient = useApollo(pageProps);

  /* 서버사이드 스타일시트 제거 */
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  /* 페이지 이동시에도 내부 State 를 유지하는 레이아웃 컴포넌트*/
  const LayoutComponent =
    typeof Component.layout === "string"
      ? (Layouts[Component.layout || "noLayout"] as any)
      : Component.layout
      ? Component.layout
      : Layouts.noLayout;

  return (
    <>
      <Head>
        {"<!-- jss-insertion-point -->"}
        <title>Next Apollo 템플릿</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <StyledEngineProvider injectFirst>
        <MuiThMuiThemeProvider theme={defaultTheme}>
          <StyledThemeProvider theme={defaultTheme}>
            {/* PAGE AUTH 를 다루려면 여기에 AuthRouter 삽입  (이 프로젝트에선 다루지 않음)*/}
            <CssBaseline />
            <ApolloProvider client={apolloClient}>
              {LayoutComponent({ children: <Component {...pageProps} /> })}
            </ApolloProvider>
          </StyledThemeProvider>
        </MuiThMuiThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default MyApp;
