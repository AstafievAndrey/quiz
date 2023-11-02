import { QuizResult } from "@prisma/client";

const URL = `/api/quizResult`;
const HEADERS = {
  "Content-Type": "application/json;charset=utf-8",
};

const create = async (data: QuizResult): Promise<QuizResult> => {
  const res = fetch(URL, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(data),
  });
  return (await res).json();
};

const find = async (): Promise<QuizResult[]> => {
  const res = fetch(URL, {
    method: "GET",
    headers: HEADERS,
  });
  return (await res).json();
};

const findActive = async (): Promise<QuizResult> => {
  const res = fetch(`${URL}/active`, {
    method: "GET",
    headers: HEADERS,
  });
  return (await res).json();
};

const update = async (data: QuizResult): Promise<QuizResult> => {
  const res = fetch(`${URL}/active`, {
    method: "PUT",
    headers: HEADERS,
    body: JSON.stringify(data),
  });
  return (await res).json();
};

export const quizResultService = {
  create,
  update,
  find,
  findActive,
};
