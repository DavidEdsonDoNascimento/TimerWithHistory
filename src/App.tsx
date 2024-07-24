import { ThemeProvider } from "styled-components";
import { Button } from "./components";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button color="primary" />
      <Button color="secondary" />
      <Button color="danger" />
      <Button color="success" />
      <Button />
      <GlobalStyle />
    </ThemeProvider>
  );
};
