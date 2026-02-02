import { NextRequest, NextResponse } from "next/server";
import { schema } from "./scheme";

export function GET(request: NextRequest) {
  return NextResponse.json([
    { id: 1, name: "Iphone", price: 1000 },
    { id: 2, name: "Samsung", price: 900 },
  ]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);

  if (validation.success === false) {
    return NextResponse.json(validation.error.issues, { status: 400 });
  }

  const validData = validation.data;

  return NextResponse.json({
    id: 3,
    name: validData.name,
    price: validData.price,
  });
}
