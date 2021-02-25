import { Paper } from "@material-ui/core";
import styled from "styled-components";

const messages = [
  "Checkout src/lib/ApolloNext.ts for Apollo Client setup",
  "Checkout src/page/_app.tsx and app-layout for stateful Persistant layout setup",
  "Checkout src/styles/override directory for theme overriding configs",
];

export default function Home() {
  return (
    <Root>
      <h3 className="text-2xl font-logo text-white mb-3">
        Next.js + Apollo + 3 style libraries template
      </h3>
      <Paper className="flex flex-col justify-center items-center p-5">
        {messages.map((msg, i) => (
          <h5 className="text-lg font-guide mb-2" key={i}>{`- ${msg}`}</h5>
        ))}
      </Paper>
    </Root>
  );
}

const Root = styled.div(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  background: theme.palette.primary.main,
}));
