import Schedule from "@/components/landing/schedule/Schedule";
import { PROGRAM_SCHEDULE } from "@/utils/global-values";

const ProgramSchedule: React.FC = () => {
  return (
    <section className="py-14 px-0 sm:px-20 md:px-32 xl:px-80">
      <h1 className="pt-8 text-center text-white text-3xl md:text-5xl">
        Program Schedule
      </h1>
      {PROGRAM_SCHEDULE.map(({ date, timetable, imageDetails }) => (
        <Schedule
          key={date}
          date={date}
          timetable={timetable}
          imageDetails={imageDetails}
        />
      ))}
    </section>
  );
};

export default ProgramSchedule;
