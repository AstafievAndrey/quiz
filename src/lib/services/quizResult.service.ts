import { QuizResult } from "@prisma/client";

const URL = `/api/quizResult`;
const HEADERS = {
  "Content-Type": "application/json;charset=utf-8",
};

const create = (data: QuizResult) => {
  return fetch(URL, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(data),
  });
};

const find = async (): Promise<QuizResult[]> => {
  const res = fetch(URL, {
    method: "GET",
    headers: HEADERS,
  });
  return (await res).json();
};

export const quizResultService = {
  create,
  find,
};
