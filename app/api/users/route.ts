import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  return NextResponse.json([
    { id: 1, name: "Tokyo" },
    { id: 2, name: "Paris" },
  ]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (typeof body.name !== "string" || body.name.trim().length === 0) {
    return NextResponse.json(
      { message: "Name must be string" },
      { status: 400 }
    );
  }

  return NextResponse.json({ id: 3, name: body.name });
}
