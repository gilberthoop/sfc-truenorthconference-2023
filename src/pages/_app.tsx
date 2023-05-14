import { AppProps } from "next/app";
import "../styles/globals.css";

function TrueNorthConference({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default TrueNorthConference;
