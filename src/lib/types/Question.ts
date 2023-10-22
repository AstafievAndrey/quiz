import { QuestionDifficultyEnum } from "../enums/QuestionDifficultyEnum";

export type Question = {
  category: string;
  difficulty: QuestionDifficultyEnum;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};
