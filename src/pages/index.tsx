import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import PosterImg from "@/assets/poster.jpeg";
import FAQ from "@/components/landing/FrequentlyAskedQuestions";
import AppNav from "@/components/AppNav";
import Introduction from "@/components/landing/Introduction";
import Promo from "@/components/landing/Promo";
import { NavigationInfo } from "@/utils/types";

export default function Home() {
  // const navMenuItems: NavigationInfo[] = [
  //   {
  //     href: "#details",
  //     name: "Details",
  //   },
  //   {
  //     href: "#faq",
  //     name: "FAQ",
  //   },
  // ];

  const router = useRouter();
  function redirectToRegistration() {
    router.push("/register");
  }

  function redirectToVerification() {
    router.push("/verify-registration");
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
        ctaTitle={"Register"}
        onCTAClick={redirectToRegistration}
        onExtraCTAclick={redirectToVerification}
        extraCTAtitle={"Verify Registration"}
      />

      <div className="main">
        <Promo />
        <Introduction />
        <FAQ />
      </div>
    </main>
  );
}
