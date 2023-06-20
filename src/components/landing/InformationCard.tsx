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
        <div className="content__heading">
          <h1>{title}</h1>
        </div>
        <div className="text-center lg:text-left">{renderedInfo}</div>
      </section>
    </div>
  );
}

export default InformationCard;
