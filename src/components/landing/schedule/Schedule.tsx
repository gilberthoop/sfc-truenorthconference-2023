import Image, { StaticImageData } from "next/image";

interface ImageDetails {
  imageDesktop: StaticImageData;
  imageMobile: StaticImageData;
  alt: string;
}

interface Timetable {
  time: string;
  detail: string;
}

interface ScheduleProps {
  date: string;
  timetable: Timetable[];
  imageDetails: ImageDetails;
}

const Schedule: React.FC<ScheduleProps> = ({
  date,
  timetable,
  imageDetails,
}) => {
  return (
    <section className="schedule__section">
      <section>
        <div className="schedule__img-div">
          <Image
            src={imageDetails.imageMobile}
            alt={imageDetails.alt}
            className="schedule__img"
          />
        </div>
      </section>
      <section className="schedule__contents">
        <h1>{date}</h1>
        <div className="schedule__contents-div">
          {timetable.map(({ time, detail }) => (
            <div key={time} className="schedule__text">
              <div className="schedule__text-div">
                <h1>{time}</h1>
              </div>
              <div className="schedule__text-div">
                <h1>{detail}</h1>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Schedule;
