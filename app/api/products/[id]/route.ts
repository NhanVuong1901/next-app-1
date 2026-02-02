import { NextRequest, NextResponse } from "next/server";
import { schema } from "../scheme";

interface Props {
  params: Promise<{ id: number }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;

  if (id > 10) {
    return NextResponse.json({ message: "Product Not Found" });
  }
  return NextResponse.json({ id: id, name: "Oppo" });
}

export async function PUT(request: NextRequest, { params }: Props) {
  const { id } = await params;

  if (id > 10) {
    return NextResponse.json({ message: "Product Not Found" });
  }

  const body = await request.json();

  const validation = schema.safeParse(body);

  if (validation.success === false) {
    return NextResponse.json(validation.error.issues, { status: 400 });
  }

  const validData = validation.data;
  // if (typeof body.name !== "string" || body.name.trim().length === 0) {
  //   return NextResponse.json(
  //     { message: "Name must be string and cannot be empty" },
  //     { status: 400 }
  //   );
  // }

  return NextResponse.json({
    id: 3,
    name: validData.name,
    price: validData.price,
  });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;

  if (id > 10) {
    return NextResponse.json({ message: "Product Not Found" });
  }

  //   return NextResponse.json(
  //     { server: `User with id ${id} has been deleted` },
  //     { status: 200 },
  //   );

  return new NextResponse(null, { status: 204 });
}
