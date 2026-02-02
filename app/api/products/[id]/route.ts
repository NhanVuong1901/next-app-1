import { NextRequest, NextResponse } from "next/server";
import { schema, schemaPatch } from "../scheme";
import { prisma } from "@/prisma/lib/prisma";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  if (!product) {
    return NextResponse.json({ message: "Product Not Found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  if (!product) {
    return NextResponse.json({ message: "Product Not Found" });
  }
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });

  const validData = validation.data;

  const updatedProduct = await prisma.product.update({
    where: { id: parseInt(id) },
    data: {
      name: validData.name,
      price: validData.price,
    },
  });

  return NextResponse.json(updatedProduct, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  if (!product) {
    return NextResponse.json({ message: "Product Not Found" });
  }

  await prisma.product.delete({
    where: { id: parseInt(id) },
  });

  return new NextResponse(null, { status: 204 });
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  if (!product) {
    return NextResponse.json({ message: "Product Not Found" });
  }
  const body = await request.json();

  const validation = schemaPatch.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });

  const validData = validation.data;

  const updatedProduct = await prisma.product.update({
    where: { id: parseInt(id) },
    data: {
      name: validData.name || product.name,
      price: validData.price || product.price,
    },
  });

  return NextResponse.json(updatedProduct, { status: 200 });
}
