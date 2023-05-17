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
    console.log(await collection.find().toArray());
    res.status(200).json(registrations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("sfctnc2023");
    const collection = database.collection("participants");

    const newRegistration: Participant = {
      ...req.body,
      _id: new ObjectId().toString(),
    };

    await collection.insertOne(newRegistration);
    res.status(201).json(newRegistration);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
}

function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    const registrations = readRegistrationsFile();
    const index = registrations.findIndex(
      (registration: Participant) => registration.id === id
    );
    if (index !== -1) {
      const deletedRegistration = registrations.splice(index, 1)[0];
      writeRegistrationsFile(registrations);
      res.status(200).json(deletedRegistration);
    } else {
      res.status(404).json({ message: "Participant not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

function readRegistrationsFile() {
  const fileContents = fs.readFileSync(FILE_PATH, "utf8");
  return JSON.parse(fileContents);
}

function writeRegistrationsFile(registrations: any) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(registrations, null, 2));
}
