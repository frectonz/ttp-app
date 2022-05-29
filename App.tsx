import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import Main from "./src/Main";

export default function App() {
  return (
    <PaperProvider
      theme={{
        ...DefaultTheme,
        roundness: 2,
        colors: {
          ...DefaultTheme.colors,
          primary: "#eee",
        },
      }}
    >
      <Main />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
