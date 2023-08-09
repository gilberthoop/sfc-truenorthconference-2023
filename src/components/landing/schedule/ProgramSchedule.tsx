import Schedule from "@/components/landing/schedule/Schedule";
import { PROGRAM_SCHEDULE } from "@/utils/global-values";

const ProgramSchedule: React.FC = () => {
  return (
    <section className="schedule__container">
      <h1>Program Schedule</h1>
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
