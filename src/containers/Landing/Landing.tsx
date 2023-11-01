import { FC } from "react";
import Link from "next/link";
import { Container, Paper, Typography } from "@mui/material";

import { RouteEndpointEnum } from "@/lib/enums";

export const LandingContainer: FC = () => {
  return (
    <Container>
      <Paper sx={{ m: 2, p: 3 }}>
        <Typography variant="h5">
          Тест по JavaScript. Javascript. Начальный уровень
        </Typography>
        <Typography>
          Чтобы пройти тест необходимо{" "}
          <Link href={RouteEndpointEnum.LOGIN}>войти в систему</Link>
        </Typography>
        <Typography>Темы тестирования:</Typography>
        <ul>
          <li>Особенности javascript и организация кода</li>
          <li>Циклы</li>
          <li>Условные операторыv</li>
          <li>Функции и функциональные выражения</li>
          <li>Основы синтаксиса</li>
          <li>Строки</li>
          <li>Массивы</li>
          <li>Операторы сравнения</li>
          <li>Логические операторы</li>
          <li>Переменные и типы данных</li>
        </ul>
      </Paper>
    </Container>
  );
};
