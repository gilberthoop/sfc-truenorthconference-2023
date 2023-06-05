import { config } from "dotenv";
import { MongoClient, ObjectId, Collection } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Participant } from "../../utils/types";

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
        await searchRegistrations(req, res, collection);
        break;
      case "POST":
        await submitRegistration(req, res, collection);
        break;
      case "DELETE":
        await deleteRegistration(req, res, collection);
        break;
      default:
        return res.status(405).end();
        break;
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

async function searchRegistrations(
  req: NextApiRequest,
  res: NextApiResponse,
  collection: Collection
) {
  const { region, area, sfcRole } = req.query;
  const searchCriteria: any = {};

  if (region) {
    const regions = Array.isArray(region) ? region : [region];
    searchCriteria.region = { $in: regions };
  }

  if (area) {
    const areas = Array.isArray(area) ? area : [area];
    searchCriteria.area = { $in: areas };
  }

  if (sfcRole) {
    const sfcRoles = Array.isArray(sfcRole) ? sfcRole : [sfcRole];
    searchCriteria.sfcRole = { $in: sfcRoles };
  }

  try {
    const registrations = await collection.find(searchCriteria).toArray();
    res.status(200).json({ registrations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving registrations" });
  }
}

async function submitRegistration(
  req: NextApiRequest,
  res: NextApiResponse,
  collection: Collection
) {
  try {
    // Check for duplicates
    const { email, ...rest } = req.body;
    const existingRegistration = await collection.findOne({ email });
    if (existingRegistration) {
      return res
        .status(400)
        .json({ message: "You are already registered under the same email." });
    }

    // Proceed to new registration
    const newRegistration: Participant = {
      ...req.body,
      _id: new ObjectId().toString(),
    };

    await collection.insertOne(newRegistration);
    res.status(201).json({ message: "Your registration is successful!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Sorry, we are unable to process your request." });
  }
}

async function deleteRegistration(
  req: NextApiRequest,
  res: NextApiResponse,
  collection: Collection
) {
  try {
    const { id } = req.query;
    const deleteResult = await collection.findOneAndDelete({ id });
    if (deleteResult.value) {
      res.status(200).json(deleteResult.value);
    } else {
      res.status(404).json({ message: "Participant not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting participant" });
  }
}
