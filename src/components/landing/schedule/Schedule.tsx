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
    <section className="schedule flex flex-col my-10 lg:my-16">
      <section>
        <div className="schedule__img-div">
          <Image
            src={imageDetails.imageMobile}
            alt={imageDetails.alt}
            className="schedule__img"
          />
          ;
        </div>
      </section>
      <section className="schedule__contents">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl pb-5 lg:pb-10">
          {date}
        </h1>
        <div className="flex flex-col items-center gap-y-4">
          {timetable.map(({ time, detail }) => (
            <div
              key={time}
              className="p-2 md:py-5 md:px-8 xl:pl-20 w-full md:w-11/12 rounded outline flex flex-col md:flex-row md:gap-x-8 lg:gap-x-10 xl:gap-x-28 gap-y-1"
            >
              <div>
                <h1 className="text-center lg:text-right">{time}</h1>
              </div>
              <div>
                <h1 className="text-center lg:text-left">{detail}</h1>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Schedule;
