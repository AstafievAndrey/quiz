import { NextResponse } from "next/server";
import prisma from "../auth/[...nextauth]/prisma";

// Handles POST requests to /api
export async function POST(request: Request) {
  return NextResponse.json({ message: "Hello World" });
}

export async function GET(request: Request) {
  // ...
  const res = prisma.quizResult.findMany();
  return NextResponse.json({ message: "Hello World", res });
}
