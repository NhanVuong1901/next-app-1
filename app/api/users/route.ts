import { NextRequest, NextResponse } from "next/server";
import { schema } from "./scheme";
import { prisma } from "@/prisma/lib/prisma";
import { email } from "zod";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });

  const validData = validation.data;

  const email = await prisma.user.findUnique({
    where: { email: validData.email },
  });

  if (email)
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 400 }
    );

  const newUser = await prisma.user.create({
    data: {
      name: validData.name,
      email: validData.email,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
