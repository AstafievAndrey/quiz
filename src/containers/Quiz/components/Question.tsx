import { QuestionDifficultyEnum } from "@/lib/enums/QuestionDifficultyEnum";
import { Question as QuestionTYpe } from "@/lib/types/Question";
import {
  Stack,
  Typography,
  Rating,
  Divider,
  Grid,
  Button,
} from "@mui/material";
import { shuffle } from "lodash";
import { FC, useEffect, useState } from "react";

interface Props {
  question: QuestionTYpe;
  questionCount: number;
  currentQuestion: number;
  currentAnswer: string | null;
  handleAnswer: (answer: string) => () => void;
}
export const Question: FC<Props> = ({
  question,
  questionCount,
  currentQuestion,
  currentAnswer,
  handleAnswer,
}) => {
  const [variantAnswer, setVariantAnswer] = useState<string[]>([]);

  const getColor = (answer: string): "inherit" | "success" | "error" => {
    if (currentAnswer) {
      if (answer === question.correct_answer) {
        return "success";
      }
      if (answer !== question.correct_answer && currentAnswer === answer) {
        return "error";
      }
    }
    return "inherit";
  };

  const checkDifficulty = (difficulty: QuestionTYpe["difficulty"]): number => {
    switch (difficulty) {
      case QuestionDifficultyEnum.HARD:
        return 5;
      case QuestionDifficultyEnum.MEDIUM:
        return 3;
      default:
        return 1;
    }
  };

  useEffect(() => {
    if (Number.isInteger(currentQuestion)) {
      setVariantAnswer(
        shuffle([question.correct_answer, ...question.incorrect_answers])
      );
    }
  }, [currentQuestion]);

  return (
    <>
      <Stack spacing={1}>
        <Typography variant="body1">Категория: {question.category}</Typography>
        <Rating value={checkDifficulty(question.difficulty)} readOnly />
        <Typography variant="h6">
          Вопрос {currentQuestion + 1} из {questionCount}
        </Typography>
      </Stack>
      <Divider sx={{ mt: 1, mb: 1 }} />
      <Typography variant="h5">{question.question}</Typography>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {variantAnswer.map((answer: string) => {
          const color = getColor(answer);
          return (
            <Grid item xs={12} sm={6} key={answer}>
              <Button
                disableRipple
                disableElevation
                disableFocusRipple
                variant={color === "inherit" ? "outlined" : "contained"}
                color={color}
                fullWidth
                onClick={handleAnswer(answer)}
              >
                {answer}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
