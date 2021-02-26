import { alpha, Palette, PaletteColorOptions, Theme } from "@material-ui/core";

export type ColorOptionUnion =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "default";

interface ColorAlphaOption {
  color: ColorOptionUnion;
  op?: number;
  perc?: string;
}

type CreateGradient = (
  theme: Theme
) => (ops: ColorAlphaOption[], dir?: string) => string;

declare module "@material-ui/core/styles/createPalette" {
  interface PaletteOptions {
    primary?: PaletteColorOptions;
    secondary?: PaletteColorOptions;
    success?: PaletteColorOptions;
    warning?: PaletteColorOptions;
    danger: PaletteColorOptions;
    default?: PaletteColorOptions;
    black: PaletteColorOptions;
    info?: PaletteColorOptions;
    gradient: CreateGradient;
  }
  interface Palette {
    primary: PaletteColor;
    secondary: PaletteColor;
    success: PaletteColor;
    warning: PaletteColor;
    danger: PaletteColor;
    default: PaletteColor;
    black: PaletteColor;
    info: PaletteColor;
    gradient: CreateGradient;
  }
}

export const createGradient: CreateGradient = (theme) => {
  return function (ops, dir = "to right") {
    const stringifiedArr = ops.map((x, i) => {
      const { color: _color, op = 1, perc = "50%" } = x;
      const color =
        op < 1
          ? alpha(theme.palette[_color].main, op)
          : theme.palette[_color].main;
      return `${color}${i === ops.length - 1 ? "" : ","} ${perc}`;
    });
    return `linear-gradient(${dir}, ${stringifiedArr.join(" ")} )`;
  };
};

const customPalatte = {
  primary: { main: "#B380AA" },
  secondary: { main: "#61A0AF" },
  success: { main: "#bcd979" },
  warning: { main: "#FCBB6D" },
  danger: { main: "#f06c9b" },
  default: { main: "#475C7A" },
  black: { main: "#293132" },
  info: { main: "#96C9DC" },
  gradient: createGradient,
};

export default customPalatte;
