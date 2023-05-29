import { config } from "dotenv";
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

config();
const uri = process.env.MONGODB_URI || "";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST request allowed" });
  }

  const { email } = req.body;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("sfctnc2023");
    const collection = database.collection("participants");

    const existingRegistration = await collection.findOne({ email });
    if (existingRegistration) {
      res.status(200).json({
        message: "You are already registered. See you soon!",
        firstname: existingRegistration.firstname,
        lastname: existingRegistration.lastname,
      });
    } else {
      res.status(200).json({ message: "You have not registered yet." });
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
