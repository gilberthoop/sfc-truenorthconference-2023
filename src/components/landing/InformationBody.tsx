import { InformationProps } from "@/utils/types";

interface InformationBodyProps {
  contents: InformationProps[];
}

function InformationBody({ contents }: InformationBodyProps) {
  return (
    <main className="info__main">
      {contents.map((content, index) => (
        <section className="info__body" key={index}>
          <h1 className="info__body-title">{content.title}</h1>
          {content.body?.map((contentBody, index) => (
            <p className="info__body-paragraph" key={index}>
              {contentBody}
            </p>
          ))}
        </section>
      ))}
    </main>
  );
}

export default InformationBody;
