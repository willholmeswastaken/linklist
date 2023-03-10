import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  await prisma.link.deleteMany();
  res.status(200).json(examples);
};

export default examples;
