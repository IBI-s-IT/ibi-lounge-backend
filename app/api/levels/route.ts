import {getCspHeaders} from "../shared/headers";
import {NextResponse} from "next/server";
import {getLevels} from "./getLevels";

export async function GET(request: Request) {
  const origin = request.headers.get('origin') || '';

  return NextResponse.json(await getLevels(), {
    headers: getCspHeaders(origin),
  })
}