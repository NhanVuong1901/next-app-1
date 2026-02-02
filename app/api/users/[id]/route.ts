import { NextRequest, NextResponse } from "next/server";
import { schema } from "../scheme";
import { prisma } from "@/prisma/lib/prisma";

interface Props {
  params: Promise<{ id: number }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user) {
    return NextResponse.json({ message: "User Not Found" }, { status: 404 });
  }
  return NextResponse.json(user);
}

export async function PUT(request: NextRequest, { params }: Props) {
  const { id } = await params;

  if (id > 10) {
    return NextResponse.json({ message: "User Not Found" });
  }
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });

  const validData = validation.data;
  return NextResponse.json({ id: 3, name: validData.name });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;

  if (id > 10) {
    return NextResponse.json({ message: "User Not Found" });
  }

  //   return NextResponse.json(
  //     { server: `User with id ${id} has been deleted` },
  //     { status: 200 },
  //   );

  return new NextResponse(null, { status: 204 });
}
