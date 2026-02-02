import { NextRequest, NextResponse } from "next/server";
import { schema } from "./scheme";
import { prisma } from "@/prisma/lib/prisma";
import { email } from "zod";

export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });

  const validData = validation.data;

  const name = await prisma.product.findUnique({
    where: { name: validData.name },
  });

  if (name)
    return NextResponse.json(
      { error: "Product already exists" },
      { status: 400 }
    );

  const newProduct = await prisma.product.create({
    data: {
      name: validData.name,
      price: validData.price,
    },
  });

  return NextResponse.json(newProduct, { status: 201 });
}
