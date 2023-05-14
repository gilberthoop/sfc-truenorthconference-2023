import { NextApiRequest, NextApiResponse } from "next";
import registrations from "../../data/participants.json";

const register = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    res.status(200).json(registrations);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

export default register;
