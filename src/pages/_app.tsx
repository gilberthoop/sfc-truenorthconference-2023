import { AppProps } from "next/app";
import { Outfit } from "next/font/google";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../styles/globals.css";
import "../styles/registration.css";
import "../styles/thankyou.css";
import "../styles/list.css";

const outfit = Outfit({
  weight: "400",
  subsets: ["latin"],
});

const theme = createTheme({
  typography: {
    fontFamily: "Outfit, sans-serif",
  },
});

function TrueNorthConference({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <main className={outfit.className}>
        <Component {...pageProps} />;
      </main>
    </ThemeProvider>
  );
}

export default TrueNorthConference;
