import * as React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Text } from "react-native";
import Main from "./src/App";

const theme = {
  ...DefaultTheme,
  roundness: 6,
  colors: {
    ...DefaultTheme.colors,
    primary: "#446cb2",
    accent: "#222324",
    additional: "#d1d1d1",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Main />
    </PaperProvider>
  );
}
