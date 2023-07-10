import { useRouter } from "next/router";
import Head from "next/head";
import AppNav from "@/components/AppNav";
import RegistrationForm from "@/components/registration/RegistrationForm";

export default function Register() {
  const router = useRouter();
  function handleCallToAction() {
    router.push("/");
  }

  return (
    <main>
      <Head>
        <title>SFC TNC Breakthrough | Register</title>
      </Head>
      <AppNav ctaTitle={"Back to Home Page"} onCTAClick={handleCallToAction} />
      <div className="main">
        <RegistrationForm />;
      </div>
    </main>
  );
}
