import { CircularProgress } from "@mui/material";
import AppBarGraph from "../AppBarGraph";
import useRegionStats from "@/hooks/use-region-stats";

const RegistrationStats: React.FC = () => {
  const { regionStats } = useRegionStats();

  return (
    <main className="my-10">
      {regionStats?.length ? (
        <AppBarGraph
          title={"Number of Registered Participants"}
          data={regionStats}
          metricAllowance={10}
        />
      ) : (
        <div className="flex justify-center">
          <CircularProgress size={50} color="info" />
        </div>
      )}
    </main>
  );
};

export default RegistrationStats;
