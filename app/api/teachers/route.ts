import {getCspHeaders} from "../shared/headers";
import {NextResponse} from "next/server";
import {getTeachers} from "./getTeachers";

export async function GET(request: Request) {
  const origin = request.headers.get('origin') || '';

  return NextResponse.json(await getTeachers(), {
    headers: getCspHeaders(origin),
  })
}