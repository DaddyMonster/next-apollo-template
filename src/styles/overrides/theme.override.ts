import { createMuiTheme, Theme } from "@material-ui/core";
import customPalatte from "./theme.color";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {}
}

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

const defaultTheme = createMuiTheme({
  // OVERRIDE WHAT YOU WANT HERE
  palette: customPalatte,
});

export default defaultTheme;
