import { NextResponse } from "next/server";
export async function GET() {
  const res = await fetch("https://turkiyeapi.herokuapp.com/api/v1/provinces");
  const data = await res.json();
  return NextResponse.json(data);
}
