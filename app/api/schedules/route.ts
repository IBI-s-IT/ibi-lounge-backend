import {getCspHeaders} from "../shared/headers";
import {getSchedules} from "./getSchedules";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;

  const origin = request.headers.get('origin') || '';

  return NextResponse.json(await getSchedules(searchParams), {
    headers: getCspHeaders(origin),
  })
}