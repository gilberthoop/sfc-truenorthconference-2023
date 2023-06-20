import { config } from "dotenv";
import { MongoClient, Collection } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Participant, RegionStats } from "../../utils/types";

config();
const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri);

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await client.connect();
    const database = client.db("sfctnc2023");
    const collection = database.collection("participants");

    switch (req.method) {
      case "GET":
        await fetchStatistics(req, res, collection);
        break;
      default:
        return res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Sorry, we are unable to process your request." });
  } finally {
    await client.close();
  }
};

async function fetchStatistics(
  req: NextApiRequest,
  res: NextApiResponse,
  collection: Collection
) {
  try {
    const registrations = await collection.find().toArray();
    const regionStatistics = getRegistrationsPerRegion(registrations);
    res.status(200).json({ regionStatistics });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving stats" });
  }
}

function getRegistrationsPerRegion(registrations: any) {
  const regions: string[] = registrations.map(
    (participant: Participant) => participant.region
  );

  regions.sort();

  const regionsCountMap: { [key: string]: number } = {};
  for (const item of regions) {
    if (regionsCountMap[item]) {
      regionsCountMap[item]++;
    } else {
      regionsCountMap[item] = 1;
    }
  }

  const result: RegionStats[] = Object.entries(regionsCountMap).map(
    ([region, count]) => ({
      region,
      count,
    })
  );

  return result;
}
