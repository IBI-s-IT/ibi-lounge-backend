import {getSchedules} from "../../lib/api/getSchedules";

export default async function handler(req, res) {
  const { query } = req;

  res.send(
    await getSchedules(query)
  );
}