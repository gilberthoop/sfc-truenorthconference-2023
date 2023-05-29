import Head from "next/head";
import RegistrationList from "@/components/registration/RegistrationList";

export default function RegistrationListPage() {
  return (
    <main>
      <Head>
        <title>SFC TNC Breakthrough | Registration List</title>
      </Head>
      <RegistrationList />
    </main>
  );
}
