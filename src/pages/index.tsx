import { useState } from "react";
import useRedirect from "@/hooks/use-redirect";
import Head from "next/head";
import Image from "next/image";
import PosterImg from "@/assets/poster.jpeg";
import FAQ from "@/components/landing/FrequentlyAskedQuestions";
import AppNav from "@/components/AppNav";
import Introduction from "@/components/landing/Introduction";
import Promo from "@/components/landing/Promo";
import MemoVideo from "@/components/landing/MemoVideo";
import AppFooter from "@/components/AppFooter";

export default function Home() {
  const [videoVisible, setVideoVisible] = useState(false);
  const { redirectToRegistration, redirectToVerification } = useRedirect();

  function handleVideoVisibility() {
    setVideoVisible((prevState) => !prevState);
  }

  return (
    <main className="min-h-screen">
      <Head>
        <title>SFC TNC Breakthrough | Welcome</title>
      </Head>

      <div className="app-header-img">
        <Image src={PosterImg} alt="SFC TNC Poster" />
      </div>

      <div className="app-header--mobile"></div>

      <AppNav
        firstCtaTitle={"Register"}
        onFirstCTAClick={redirectToRegistration}
        secondCtaTitle={"Verify Registration"}
        onSecondCTAclick={redirectToVerification}
      />

      <div className="main">
        <Promo />
        <Introduction />
        <FAQ />
      </div>

      <MemoVideo
        visible={videoVisible}
        toggleVisibility={handleVideoVisibility}
      />

      <AppFooter
        info="Registration ends July 23"
        onCtaClick={handleVideoVisibility}
      />
    </main>
  );
}
