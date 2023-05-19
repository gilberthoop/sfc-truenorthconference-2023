import Head from "next/head";
import Image from "next/image";
import PosterImg from "../assets/poster.jpeg";
import Form from "../components/registration/Form";

export default function Home() {
  return (
    <main className="main">
      <Head>
        <title>SFC TNC Breakthrough | Register</title>
      </Head>
      <div className="registration__header-img">
        <Image src={PosterImg} alt="SFC TNC Poster" />
      </div>
      <Form />
    </main>
  );
}
