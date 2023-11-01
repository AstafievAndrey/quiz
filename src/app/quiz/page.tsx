import { FC } from "react";
import { Metadata } from "next";

import { QuizContainer } from "@/containers";
import { Question } from "@/lib/types/Question";

import questions from "./questions.json";

export const metadata: Metadata = {
  title: "Тестирование",
  description: "Страница тестирования",
};

const QuizPage: FC = () => {
  return <QuizContainer questions={questions as Question[]} />;
};

export default QuizPage;
