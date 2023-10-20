import {getCspHeaders} from "../shared/headers";
import {NextResponse} from "next/server";
import {getGrades} from "./getGrades";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;

  const origin = request.headers.get('origin') || '';

  return NextResponse.json(await getGrades(searchParams), {
    headers: getCspHeaders(origin),
  })
}