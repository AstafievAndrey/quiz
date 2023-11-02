import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import prisma from "../auth/[...nextauth]/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const { answerCount, errorCount, questionCount } = await req.json();

  try {
    if (session?.user) {
      const quizResult = await prisma.quizResult.create({
        data: {
          userId: session!.user.id,
          answerCount,
          errorCount,
          questionCount,
        },
      });
      return NextResponse.json({ quizResult });
    }
  } catch (error) {
    return NextResponse.json({ message: "Ошибка", error });
  }
}

export async function GET(req: Request, res: Response) {
  const quizResult = await prisma.quizResult.findMany();
  return NextResponse.json(quizResult);
}
