import useRedirect from "@/hooks/use-redirect";
import Head from "next/head";
import Image from "next/image";
import PosterImg from "@/assets/poster.jpeg";
import FAQ from "@/components/landing/FrequentlyAskedQuestions";
import AppNav from "@/components/AppNav";
import Promo from "@/components/landing/Promo";
import ProgramSchedule from "@/components/landing/schedule/ProgramSchedule";
import Introduction from "@/components/landing/Introduction";
import AppFooterSecondary from "@/components/AppFooterSecondary";

export default function Home() {
  const { redirectToVerification } = useRedirect();

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
        secondCtaTitle={"Verify Registration"}
        onSecondCTAclick={redirectToVerification}
      />

      <div className="main">
        <Introduction />
        <ProgramSchedule />
        <Promo />
        <FAQ />
      </div>
      <AppFooterSecondary />
    </main>
  );
}
