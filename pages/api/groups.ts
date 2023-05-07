import {getGroups} from "../../lib/api/getGroups";

export default async function handler(req, res) {
  const { query } = req;

  res.send(
    await getGroups(query)
  );
}