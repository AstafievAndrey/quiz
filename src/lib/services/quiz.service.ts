import { QuizResult } from "@/lib/types";

const addResult = (data: QuizResult) => {
  return fetch("//localhost:3000/api/quiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
};

export const quizService = {
  addResult,
};
