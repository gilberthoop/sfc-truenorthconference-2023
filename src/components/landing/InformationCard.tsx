import { InformationProps } from "@/utils/types";

function InformationCard({ title, faqContents }: InformationProps) {
  const renderedInfo = (
    <ul>
      {faqContents?.map((faq, index) => (
        <li key={index} className="content__list-item">
          <h3 className="content__list-item-title">{faq.question}</h3>
          {faq.answers.map((answer, index) => (
            <p key={index} className="content__list-item-body">
              {answer}
            </p>
          ))}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="content">
      <section className="content__section">
        <div className="py-4 sm:py-8 lg:py-0">
          <h1 className="text-4xl sm:text-5xl text-center">{title}</h1>
        </div>
        <div className="text-center lg:text-left">{renderedInfo}</div>
      </section>
    </div>
  );
}

export default InformationCard;
