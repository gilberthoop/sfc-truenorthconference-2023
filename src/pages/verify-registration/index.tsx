import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { CircularProgress } from "@mui/material";
import { sanitizeInput } from "@/utils/input-validation";
import AppNav from "@/components/AppNav";

export default function VerifyRegistration() {
  const [email, setEmail] = useState<string>("");
  const [greeting, setGreeting] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const sanitizedInput = sanitizeInput(value, name);
    setEmail(sanitizedInput);
  }

  async function checkRegistration(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("/api/verification", { email });
      const { message, firstname } = response.data;
      const greeting = firstname ? `Hi ${firstname}. ${message}` : message;
      setGreeting(greeting);
    } catch {
      setGreeting(
        "We are unable to process the request. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  const router = useRouter();
  function handleCallToAction() {
    router.push("/register");
  }

  return (
    <main>
      <Head>
        <title>SFC Breakthrough | Verify Registration</title>
      </Head>
      {/* <AppNav ctaTitle={"Register"} onCTAClick={handleCallToAction} /> */}
      <section className="verification">
        <form onSubmit={checkRegistration} className="verification__form">
          <header className="verification__header text-center">
            <h1 className="text-2xl sm:text-3xl pb-4">
              Verify your registration
            </h1>
          </header>

          {greeting && <div className="verification__result">{greeting}</div>}

          <div className="verification__form-field">
            <div>
              <label htmlFor="email" className="verification__form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                className="verification__form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              className={`verification__submit-btn rounded focus:outline-none focus:shadow-outline ${
                loading ? "spinner" : ""
              }`}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Submit"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
