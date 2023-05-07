import {wrapInError} from "../../lib/utils/response";
import {getSchedules} from "../../lib/api/getSchedules";
import {getRaspisanFormattedDate} from "../../lib/utils/date";
import {convertLessonDaysToiCalendarEvents} from "../../lib/calendar/getCalendar";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.query.group) {
      return res.status(400).send(wrapInError('No group param provided'))
    }

    const data = await getSchedules({
      // @ts-ignore
      group: req.query.group,
      dateStart: getRaspisanFormattedDate(new Date(new Date().getFullYear(), 0, 1)),
      dateEnd: getRaspisanFormattedDate(new Date(new Date().getFullYear(), 11, 31)),
    });

    if (data && 'response' in data) {
      const calendar = await convertLessonDaysToiCalendarEvents(data.response);
      return res
        .setHeader('Content-Type', 'text/calendar')
        .send(calendar);
    }

    res
      .status(500)
      .send(wrapInError('Unknown error'))
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}