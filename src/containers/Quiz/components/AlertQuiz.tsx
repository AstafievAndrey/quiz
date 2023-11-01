import { Grid, Alert } from "@mui/material";
import { FC } from "react";

interface Props {
  correctAnswer: string;
  currentAnswer: string | null;
}
export const AlertQuiz: FC<Props> = ({ currentAnswer, correctAnswer }) => {
  const isCorrect = currentAnswer === correctAnswer;
  return currentAnswer ? (
    <Grid item xs={12}>
      <Alert severity={isCorrect ? "success" : "error"}>
        {isCorrect ? "Верно" : "Неправильно"}
      </Alert>
    </Grid>
  ) : null;
};
