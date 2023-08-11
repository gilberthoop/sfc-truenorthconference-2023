import Head from "next/head";
import useRedirect from "@/hooks/use-redirect";
import AppNav from "@/components/AppNav";
import RegistrationForm from "@/components/registration/RegistrationForm";

export default function Register() {
  const { redirectToHome } = useRedirect();

  return (
    <main>
      <Head>
        <title>SFC TNC Breakthrough | Register</title>
      </Head>
      <AppNav firstCtaTitle={"Home"} onFirstCTAClick={redirectToHome} />
      <div className="main">
        <RegistrationForm />;
      </div>
    </main>
  );
}
