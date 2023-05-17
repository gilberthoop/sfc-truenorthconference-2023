import Form from "../components/registration/Form";

export default function Home() {
  return (
    <main className="w-full px-8 sm:px-10">
      <header className="registration__heading text-center pt-10 pb-5">
        <h1 className="text-5xl pb-4">Register</h1>
        <p className="text-base">Join SFC Canada's biggest event in 2023.</p>
      </header>
      <Form />
    </main>
  );
}
