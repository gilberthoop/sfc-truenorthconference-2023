import { useState } from "react";
import Head from "next/head";
import { CircularProgress } from "@mui/material";
import { sanitizeInput } from "@/utils/input-validation";

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
      const response = await fetch("/api/verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const { message, firstname } = await response.json();
      const greeting = firstname ? `Hi ${firstname}. ${message}` : message;
      setGreeting(greeting);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="main">
      <Head>
        <title>SFC Breakthrough | Verify Registration</title>
      </Head>
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
                type="text"
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
