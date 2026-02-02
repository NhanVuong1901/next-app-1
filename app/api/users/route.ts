import { NextRequest, NextResponse } from "next/server";
import { schema } from "./scheme";
import { prisma } from "@/prisma/lib/prisma";

export function GET(request: NextRequest) {
  const users = prisma.user.findMany();
  return NextResponse.json(users);
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
