import axios from "axios";
import { RegionStats } from "@/utils/types";
import { useState, useEffect } from "react";

export default function useRegionStats() {
  const API_ENDPOINT_URL = "/api/statistics";
  const [regionStats, setRegionStats] = useState<RegionStats[]>();

  const fetchRegionStats = async () => {
    try {
      const response = await axios.get(API_ENDPOINT_URL);
      const statsResult = response.data?.regionStatistics;

      setRegionStats(statsResult);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRegionStats();
  }, []);

  return { regionStats };
}
