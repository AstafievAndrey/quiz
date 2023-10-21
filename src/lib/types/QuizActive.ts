import { QuizResult } from "./QuizResult";

export type QuizActive = {
  currentQuestion: number;
} & Omit<QuizResult, "date">;
