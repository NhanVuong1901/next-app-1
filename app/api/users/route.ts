import { NextRequest, NextResponse } from "next/server";
import { schema } from "./scheme";

export function GET(request: NextRequest) {
  return NextResponse.json([
    { id: 1, name: "Tokyo" },
    { id: 2, name: "Paris" },
  ]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);

  if (validation.success === false) {
    return NextResponse.json(validation.error.issues, { status: 400 });
  }
  
  const validData = validation.data;

  return NextResponse.json({ id: 3, name: validData.name });
}
