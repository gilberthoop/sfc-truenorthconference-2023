import { RegionStats } from "@/utils/types";

interface BarGraphProps {
  title: string;
  data: RegionStats[];
  metricAllowance?: number;
}

function AppBarGraph({ title, data, metricAllowance = 0 }: BarGraphProps) {
  const maxStatsValue = getMaxStatsValue();
  const metrics = getMetrics(maxStatsValue);

  function getMaxStatsValue(): number {
    const counts = data?.map((value) => value.count) ?? [];
    const maxCount = Math.max(...counts);
    const maxValue = Math.round(maxCount / 10) * 10;

    return maxValue + metricAllowance;
  }

  function getMetrics(maxValue: number): number[] {
    const metrics: number[] = [];
    for (let i = 0; i <= maxValue; i += 10) {
      metrics.push(i);
    }

    return metrics;
  }

  const renderedBarGraph = (
    <section>
      <h1 className="bargraph__title">{title}</h1>
      <div className="bargraph__data">
        {data.map((value, index) => (
          <div key={index}>
            <div
              key={index}
              className="bargraph__bar"
              style={{
                width: `${(value.count / maxStatsValue) * 100}%`,
                transition: "width 1s ease-in-out",
              }}
            />
            <p>{value.region}</p>
          </div>
        ))}
      </div>
      <div className="bargraph__metrics">
        {metrics.map((value, index) => (
          <h1 key={index}>{value}</h1>
        ))}
      </div>
    </section>
  );

  return (
    <main>
      <div className="bargraph">{renderedBarGraph}</div>
    </main>
  );
}

export default AppBarGraph;
