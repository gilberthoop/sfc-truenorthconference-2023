import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { Participant } from "../../utils/types";

const FILENAME = "participants.json";
const FILE_PATH = path.join(process.cwd(), "src", "data", FILENAME);
const uri =
  "mongodb+srv://williamgilbertgo:005XIAV3r@cluster0.uaysdod.mongodb.net/sfctnc2023?retryWrites=true&w=majority";

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return handleGet(req, res);
    case "POST":
      return handlePost(req, res);
    case "DELETE":
      return handleDelete(req, res);
    default:
      return res.status(405).end();
  }
};

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("sfctnc2023");
    const collection = database.collection("participants");
    const registrations = await collection.find().toArray();
    res.status(200).json(registrations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { email, ...rest } = req.body;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("sfctnc2023");
    const collection = database.collection("participants");

    // Check for duplicates
    const existingRegistration = await collection.findOne({ email });
    if (existingRegistration) {
      return res
        .status(400)
        .json({ message: "You are already registered under the same email." });
    }

    const newRegistration: Participant = {
      ...req.body,
      _id: new ObjectId().toString(),
    };

    await collection.insertOne(newRegistration);
    res.status(201).json(newRegistration);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Sorry, we are unable to process your request." });
  } finally {
    await client.close();
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("sfctnc2023");
    const collection = database.collection("participants");

    const deleteResult = await collection.findOneAndDelete({ id });

    if (deleteResult.value) {
      res.status(200).json(deleteResult.value);
    } else {
      res.status(404).json({ message: "Participant not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
}
