import {getCspHeaders} from "../shared/headers";
import {NextResponse} from "next/server";
import {getGroups} from "./getGroups";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;

  const origin = request.headers.get('origin') || '';

  return NextResponse.json(await getGroups(searchParams), {
    headers: getCspHeaders(origin),
  })
}