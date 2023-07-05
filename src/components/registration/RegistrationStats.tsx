import axios from "axios";
import { RegionStats } from "@/utils/types";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import AppBarGraph from "../AppBarGraph";

function RegistrationStats() {
  const API_ENDPOINT_URL = "/api/statistics";
  const [regionStats, setRegionStats] = useState<RegionStats[]>();

  async function fetchRegionStats() {
    try {
      const response = await axios.get(API_ENDPOINT_URL);
      const statsResult = response.data?.regionStatistics;

      setRegionStats(statsResult);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRegionStats();
  }, []);

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
}

export default RegistrationStats;
