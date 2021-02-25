import { createMuiTheme, Theme } from "@material-ui/core";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {}
}

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

const defaultTheme = createMuiTheme({
  // OVERRIDE WHAT YOU WANT HERE
});

export default defaultTheme;
