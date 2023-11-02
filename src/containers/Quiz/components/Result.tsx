import { Button, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { QuizResult } from "@prisma/client";
import { useRouter } from "next/navigation";
import { RouteEndpointEnum } from "@/lib/enums/RouteEndpointEnum";
import { ProgressPercent } from "@/components";

interface Props {
  result: QuizResult;
}

export const Result: FC<Props> = ({ result }) => {
  const { push } = useRouter();
  const handleClick = () => {
    push(RouteEndpointEnum.MAIN);
  };
  const numberDeclensions = (value: number, words: string[]) => {
    value = Math.abs(value) % 100;
    const num = value % 10;
    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num === 1) return words[0];
    return words[2];
  };

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h5" textAlign="center">
            Тест пройден
          </Typography>
          <Typography textAlign="center" fontWeight={500}>
            Вы ответили верно на {result.answerCount}{" "}
            {numberDeclensions(result.answerCount, [
              "вопрос",
              "вопроса",
              "вопросов",
            ])}{" "}
            из {result.questionCount}
          </Typography>
          <ProgressPercent
            answerCount={result.answerCount}
            count={result.questionCount}
          />
        </Grid>
        <Grid item xs={12} display={"flex"} justifyContent={"center"}>
          <Button onClick={handleClick}>На главную</Button>
        </Grid>
      </Grid>
    </>
  );
};
