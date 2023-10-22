"use client";
import { FC, useState } from "react";
import { Container, Paper, Grid, Button, Fade } from "@mui/material";
import { Question } from "@/lib/types/Question";
import { useSession } from "next-auth/react";
import { useQuizLocalStorage } from "@/hooks/useQuizLocalStorage";
import {
  AlertQuiz,
  Progress,
  Question as QuestionContainer,
  Result,
} from "./components";
import { QuizResult } from "@/lib/types/QuizResult";

interface Props {
  questions: Question[];
}
export const QuizContainer: FC<Props> = ({ questions }) => {
  const { data } = useSession();

  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [result, setResult] = useState<Omit<QuizResult, "date"> | null>(null);
  const { active, handleActive, handleAddResult } = useQuizLocalStorage(
    data?.user?.userName ?? null,
    true
  );

  const handleAnswer = (answer: string) => () => {
    if (!currentAnswer) {
      setCurrentAnswer(answer);
    }
  };

  const calcCount = () => {
    let errorCount = active!.errorCount;
    let answerCount = active!.answerCount;
    if (currentAnswer === questions[active!.currentQuestion].correct_answer) {
      answerCount += 1;
    } else {
      errorCount += 1;
    }
    return {
      errorCount,
      answerCount,
    };
  };

  const handleEndQuiz = () => {
    const result = { ...active!, ...calcCount() };
    handleAddResult(result);
    setResult(result!);
  };

  const handleNextQuestion = () => {
    setCurrentAnswer(null);
    active &&
      handleActive({
        ...active,
        ...calcCount(),
        questionCount: questions.length,
        currentQuestion: active!.currentQuestion + 1,
      });
  };

  return (
    <Fade in>
      <Container maxWidth="md">
        <Paper sx={{ m: 2, mt: 6, p: 2 }}>
          {active && (
            <>
              <QuestionContainer
                question={questions[active.currentQuestion]}
                questionCount={questions.length}
                currentQuestion={active.currentQuestion}
                currentAnswer={currentAnswer}
                handleAnswer={handleAnswer}
              />
              <Grid container spacing={4} sx={{ mt: 4 }}>
                <AlertQuiz
                  currentAnswer={currentAnswer}
                  correctAnswer={
                    questions[active.currentQuestion].correct_answer
                  }
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
              </Grid>
              <Progress
                answerCount={active.answerCount}
                count={questions.length}
              />
            </>
          )}
          {result && <Result result={result} />}
        </Paper>
      </Container>
    </Fade>
  );
};
