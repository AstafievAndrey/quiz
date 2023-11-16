import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import prisma from "../auth/[...nextauth]/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const { answerCount, errorCount, questionCount, currentQuestion } =
    await req.json();

  try {
    if (session?.user) {
      const quizResult = await prisma.quizResult.create({
        data: {
          userId: session!.user.id,
          answerCount,
          errorCount,
          currentQuestion,
          questionCount,
        },
      });
      return NextResponse.json(quizResult);
    }
  } catch (error) {
    return NextResponse.json({ message: "Ошибка", error });
  }
}

export async function GET(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user) {
      const quizResult = await prisma.quizResult.findMany({
        where: {
          userId: session.user.id,
        },
      });
      return NextResponse.json(quizResult);
    }
  } catch (error) {
    return NextResponse.json({ message: "Ошибка", error });
  }
}
