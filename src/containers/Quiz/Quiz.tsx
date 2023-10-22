"use client";
import { FC, useEffect, useState } from "react";
import { shuffle } from "lodash";
import {
  Container,
  Paper,
  Stack,
  Typography,
  Rating,
  Divider,
  Grid,
  Button,
} from "@mui/material";
import { Question } from "@/lib/types/Question";
import { useSession } from "next-auth/react";
import { useQuizLocalStorage } from "@/hooks/useQuizLocalStorage";
import { AlertQuiz, Progress } from "./components";
import { useRouter } from "next/navigation";
import { RouteEndpointEnum } from "@/lib/enums/RouteEndpointEnum";
import { QuestionDifficultyEnum } from "@/lib/enums/QuestionDifficultyEnum";

interface Props {
  questions: Question[];
}
export const QuizContainer: FC<Props> = ({ questions }) => {
  const { data } = useSession();
  const { push } = useRouter();
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [variantAnswer, setVariantAnswer] = useState<string[]>([]);
  const { active, handleActive, handleAddResult } = useQuizLocalStorage(
    data?.user?.userName ?? null,
    true
  );

  const checkDifficulty = (difficulty: Question["difficulty"]): number => {
    switch (difficulty) {
      case QuestionDifficultyEnum.HARD:
        return 5;
      case QuestionDifficultyEnum.MEDIUM:
        return 3;
      default:
        return 1;
    }
  };

  const handleAnswer = (answer: string) => () => {
    if (!currentAnswer) {
      setCurrentAnswer(answer);
    }
  };

  const handleEndQuiz = () => {
    handleAddResult(active!);
    push(RouteEndpointEnum.MAIN);
  };

  const handleNextQuestion = () => {
    setCurrentAnswer(null);
    let errorCount = active!.errorCount;
    let answerCount = active!.answerCount;
    if (currentAnswer === questions[active!.currentQuestion].correct_answer) {
      answerCount += 1;
    } else {
      errorCount += 1;
    }
    active &&
      handleActive({
        ...active,
        answerCount,
        errorCount,
        questionCount: questions.length,
        currentQuestion: active!.currentQuestion + 1,
      });
  };

  const getColor = (answer: string): "inherit" | "success" | "error" => {
    if (currentAnswer) {
      if (answer === questions[active!.currentQuestion].correct_answer) {
        return "success";
      }
      if (
        answer !== questions[active!.currentQuestion].correct_answer &&
        currentAnswer === answer
      ) {
        return "error";
      }
    }
    return "inherit";
  };

  useEffect(() => {
    if (Number.isInteger(active?.currentQuestion)) {
      setVariantAnswer(
        shuffle([
          questions[active!.currentQuestion].correct_answer,
          ...questions[active!.currentQuestion].incorrect_answers,
        ])
      );
    }
  }, [active?.currentQuestion]);

  return active ? (
    <Container maxWidth="md">
      <Paper sx={{ m: 2, mt: 6, p: 2 }}>
        <Stack spacing={1}>
          <Typography variant="body1">
            Категория: {questions[active.currentQuestion].category}
          </Typography>
          <Rating
            value={checkDifficulty(
              questions[active.currentQuestion].difficulty
            )}
            readOnly
          />
          <Typography variant="h6">
            Вопрос {active.currentQuestion + 1} из {questions.length}
          </Typography>
        </Stack>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Typography variant="h5">
          {questions[active.currentQuestion].question}
        </Typography>
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
          <AlertQuiz
            currentAnswer={currentAnswer}
            correctAnswer={questions[active.currentQuestion].correct_answer}
          />
          <Grid item xs={12} display={"flex"} justifyContent={"center"}>
            {active.currentQuestion < questions.length - 1 ? (
              <Button
                variant="contained"
                disabled={!currentAnswer}
                onClick={handleNextQuestion}
              >
                Следующий вопрос
              </Button>
            ) : (
              <Button
                variant="contained"
                disabled={!currentAnswer}
                onClick={handleEndQuiz}
              >
                Завершить тест
              </Button>
            )}
          </Grid>
          <Progress answerCount={active.answerCount} count={questions.length} />
        </Grid>
      </Paper>
    </Container>
  ) : null;
};
