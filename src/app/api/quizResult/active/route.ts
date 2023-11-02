import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "../../auth/[...nextauth]/authOptions";
import prisma from "../../auth/[...nextauth]/prisma";
import questions from "../../../quiz/questions.json";

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    let active = await prisma.quizResult.findFirst({
      where: { isActive: true, userId: session.user.id },
    });

    if (!active) {
      active = await prisma.quizResult.create({
        data: {
          userId: session!.user.id,
          answerCount: 0,
          errorCount: 0,
          currentQuestion: 1,
          isActive: true,
          questionCount: questions.length,
        },
      });
    }

    return NextResponse.json(active);
  }

  return NextResponse.json({});
}

export async function PUT(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    const {
      id,
      answerCount,
      errorCount,
      questionCount,
      currentQuestion,
      isActive,
    } = await req.json();

    const active = await prisma.quizResult.update({
      data: {
        answerCount,
        errorCount,
        questionCount,
        currentQuestion,
        isActive,
      },
      where: { id },
    });

    return NextResponse.json(active);
  }

  return NextResponse.json({});
}
