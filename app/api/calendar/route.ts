import {getCspHeaders} from "../shared/headers";
import {getCalendar} from "./getCalendar";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const origin = request.headers.get('origin') || '';

  return new Response(await getCalendar(searchParams), {
    headers: [...getCspHeaders(origin), ['Content-Type', 'text/calendar']],
  })
}