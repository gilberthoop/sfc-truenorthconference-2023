import { useRouter } from "next/router";

export default function useRedirect() {
  const router = useRouter();

  const redirectToHome = () => {
    router.push("/");
  };

  const redirectToRegistration = () => {
    router.push("/register");
  };

  const redirectToVerification = () => {
    router.push("/verify-registration");
  };

  return {
    redirectToHome,
    redirectToRegistration,
    redirectToVerification,
  };
}
