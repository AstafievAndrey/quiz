import { FC } from "react";
import { Metadata } from "next";

import { QuizContainer } from "@/containers";
import prisma from "../api/auth/[...nextauth]/prisma";

export const metadata: Metadata = {
  title: "Тестирование",
  description: "Страница тестирования",
};

const QuizPage: FC = async () => {
  const questions = await prisma.question.findMany({
    include: { category: true },
  });
  return <QuizContainer questions={questions} />;
};

export default QuizPage;
