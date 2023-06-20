import InformationCard from "./InformationCard";

function FrequentlyAskedQuestions() {
  const faqData = [
    {
      question: "When:",
      answers: [
        "Friday, August 11, 2023 – Sunday, August 13, 2023.",
        "Doors officially open at 8pm.",
      ],
    },
    {
      question: "Where:",
      answers: ["Novotel Toronto North York", "3 Park Home Ave", "Toronto, ON"],
    },
    {
      question: "Accommodation:",
      answers: [
        "Seneca College Residence (Newnham Campus)",
        "1760 Finch Ave E.",
        "Toronto, ON",
      ],
    },
    {
      question: "Open to:",
      answers: ["All SFC members"],
    },
    {
      question: "Cost:",
      answers: [
        "$275 for participants",
        "$300 for Couple Coordinators (for the pair)",
      ],
    },
    {
      question: "Where do I register?",
      answers: [
        "On the official TNC 2023: Breakthrough Registration Website:",
        "sfctncbreakthrough.vercel.app/register",
      ],
    },
    {
      question: "Where do I send my registration fee?",
      answers: [
        "You can e-transfer your registration fee to cfcsfctnc@gmail.com using the question 'What is this year's anchor verse?' and use the password mark21011.",
        "Please indicate the full name of the registered individual you are paying for in the message box. You will receive a confirmation email within 24 hours once payment is received.",
      ],
    },
    {
      question: "Is there a deadline?",
      answers: [
        "Yes! Registration will be closed on July 9, 2023 at Midnight PST.",
      ],
    },
  ];

  return (
    <main className="py-10 lg:px-20 text-white">
      <InformationCard title={"It's that time again!"} faqContents={faqData} />
    </main>
  );
}

export default FrequentlyAskedQuestions;
