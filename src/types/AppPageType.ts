import { LayoutsType } from "../app-layout";

// IF PROPS NEEDS TO BE PASSED THROUGHT PAGES, USE CONTEXT PROVIDER

export interface MyPageType<P = {}> extends React.FC<P> {
  layout?: keyof LayoutsType | React.ComponentType;
}
