"use client";
import { FC, useState, useEffect } from "react";
import { Container, Paper, Grid, Button, Fade } from "@mui/material";
import {
  AlertQuiz,
  Progress,
  Question as QuestionContainer,
  Result,
} from "./components";
import { Prisma, QuizResult } from "@prisma/client";
import { quizResultService } from "@/lib/services";
import { useSendRequest } from "@/hooks";

interface Props {
  questions: Prisma.QuestionGetPayload<{
    include: {
      category: true;
    };
  }>[];
}
export const QuizContainer: FC<Props> = ({ questions }) => {
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [active, setActive] = useState<QuizResult | null>(null);
  const [getActive, { data: quizResultGetActive }] = useSendRequest<QuizResult>(
    {
      fn: () => {
        return quizResultService.findActive();
      },
    }
  );
  const [
    updActive,
    { data: quizResultUpdActive, isLoading: isLoadingUpdActive },
  ] = useSendRequest<QuizResult>({
    fn: (data: QuizResult) => {
      return quizResultService.update(data);
    },
  });

  const handleAnswer = (answer: string) => () => {
    if (!currentAnswer) {
      setCurrentAnswer(answer);
    }
  };

  const calcCount = () => {
    let errorCount = active!.errorCount;
    let answerCount = active!.answerCount;
    if (
      currentAnswer === questions[active!.currentQuestion - 1].correctAnswer
    ) {
      answerCount += 1;
    } else {
      errorCount += 1;
    }
    return {
      errorCount,
      answerCount,
    };
  };

  const handleEndQuiz = async () => {
    if (active) {
      updActive({
        ...active,
        ...calcCount(),
        isActive: false,
        questionCount: questions.length,
        currentQuestion: questions.length,
      });
    }
  };

  const handleNextQuestion = () => {
    setCurrentAnswer(null);
    if (active) {
      updActive({
        ...active,
        ...calcCount(),
        questionCount: questions.length,
        currentQuestion: active.currentQuestion + 1,
      });
    }
  };

  useEffect(() => {
    if (quizResultGetActive) {
      setActive(quizResultGetActive);
    }
  }, [quizResultGetActive]);

  useEffect(() => {
    if (quizResultUpdActive) {
      setActive(quizResultUpdActive);
    }
  }, [quizResultUpdActive]);

  useEffect(() => {
    getActive();
  }, []);

  const currentQuestionIndex = (active?.currentQuestion ?? 0) - 1;
  return (
    <Fade in>
      <Container maxWidth="md">
        <Paper sx={{ m: 2, mt: 6, p: 2 }}>
          {active && active.isActive && (
            <>
              <QuestionContainer
                question={questions[currentQuestionIndex]}
                questionCount={questions.length}
                currentQuestion={currentQuestionIndex}
                currentAnswer={currentAnswer}
                handleAnswer={handleAnswer}
              />
              <Grid container spacing={4} sx={{ mt: 4 }}>
                <AlertQuiz
                  currentAnswer={currentAnswer}
                  correctAnswer={questions[currentQuestionIndex].correctAnswer}
                />
                <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                  {active.currentQuestion < questions.length ? (
                    <Button
                      variant="contained"
                      disabled={!currentAnswer || isLoadingUpdActive}
                      onClick={handleNextQuestion}
                    >
                      Следующий вопрос
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      disabled={!currentAnswer || isLoadingUpdActive}
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
          {active && !active.isActive && <Result result={active} />}
        </Paper>
      </Container>
    </Fade>
  );
};
