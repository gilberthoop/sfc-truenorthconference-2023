import InformationBody from "@/components/landing/InformationBody";
import RegistrationStats from "@/components/registration/RegistrationStats";
import { InformationProps } from "@/utils/types";

function Introduction() {
  const contents = [
    {
      title: "Brothers and sisters in Christ",
      body: [
        "We hope you all are doing well with your personal preparations for this year's True North Conference! Registration is currently open and numbers of registered brothers and sisters are tallying up. The chart above shows the current registered numbers per area.",
        "Great job thus far SFC! If you haven't done so yet, register online at sfctncbreakthrough.vercel.app. There's also an incentive for people to register and attend this year's TNC! When we reach 165 paid registrants, 2 LUCKY PARTICIPANTS will have their registration fee FULLY REFUNDED and with 180 paid registrants, EVERYONE will receive a PORTION OF THEIR REG REFUNDED!! So call your households and let's make this reunion a BREAKTHROUGH!",
        "For those who have already registered for TNC, make sure you keep an eye out in your emails (both inbox and junk folder) for updates regarding TNC. We will be sending out regular memos like this to update you on the upcoming TNC. With that being said, here is your first update:",
      ],
    },
    {
      title: "How to pay your registration fee",
      body: [
        'To pay for your registration, simply e-transfer your fee to cfcsfctnc@gmail.com. Please use the security question as "What is this year\'s anchor verse?" and the answer "mark21011". Please indicate in the message box the name of the registrant you are paying for. Once received, you will receive a confirmation email within 24 hours.',
        "Need financial assistance? Please consult with your Couple Coordinators as there is a possibility that your Area Governance Team may have payment options available for you.",
        "That's all for this memo friends! Keep an eye out on all social media platforms and your inbox for more updates to come. Till next time, God bless and thank you for your continued prayers and support in making this conference happen!",
      ],
    },
  ] as InformationProps[];

  return (
    <main className="introduction__main">
      <RegistrationStats />
      <InformationBody contents={contents} />
    </main>
  );
}

export default Introduction;
