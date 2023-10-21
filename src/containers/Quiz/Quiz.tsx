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
  Slider,
  Button,
  Alert,
} from "@mui/material";
import { Question } from "@/lib/types/Question";
import { useSession } from "next-auth/react";
import { useQuizLocalStorage } from "@/hooks/useQuizLocalStorage";
import { AlertQuiz } from "./components";
import { useRouter } from "next/navigation";

const INIT = {
  currentQuestion: 0,
  errorCount: 0,
  questionCount: 0,
  answerCount: 0,
};

interface Props {
  questions: Question[];
}
export const QuizContainer: FC<Props> = ({ questions }) => {
  const { data } = useSession();
  const { push } = useRouter();
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [variantAnswer, setVariantAnswer] = useState<string[]>([]);
  const { active, handleActive, loading } = useQuizLocalStorage(
    data?.user?.userName ?? null
  );

  const checkDifficulty = (difficulty: Question["difficulty"]): number => {
    switch (difficulty) {
      case "hard":
        return 5;
      case "medium":
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
    handleActive(null);
    push("/");
  };

  const handleNextQuestion = () => {
    setCurrentAnswer(null);
    active &&
      handleActive({ ...active, currentQuestion: active!.currentQuestion + 1 });
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
    console.log({ active, loading });
    if (!active && !loading) {
      handleActive(INIT);
    }
  }, [active, loading]);

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
          <Grid item xs={12}>
            <Slider max={100} marks step={5} disabled />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  ) : null;
};
