"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Stack, Avatar, Typography, Button } from "@mui/material";
import Face5Icon from "@mui/icons-material/Face5";

import { useQuizLocalStorage } from "@/hooks";
import { RouteEndpointEnum } from "@/lib/enums";

export const UserInfo: FC = () => {
  const { data } = useSession();
  const { active, handleActive } = useQuizLocalStorage(
    data?.user?.name ?? null
  );
  const { push } = useRouter();

  const handlePush = () => {
    push(RouteEndpointEnum.QUIZ);
  };

  const handleStartAgain = () => {
    handleActive(null);
    push(RouteEndpointEnum.QUIZ);
  };
  return (
    <>
      <Stack direction="row" spacing={2} alignItems={"center"}>
        <Avatar src={data?.user?.image ?? undefined}>
          <Face5Icon />
        </Avatar>

        <Typography fontWeight={500}>{data?.user?.name}</Typography>
      </Stack>

      {active ? (
        <Stack spacing={2} direction={"row"}>
          <Button onClick={handlePush} variant="contained">
            Продолжить
          </Button>
          <Button variant="contained" onClick={handleStartAgain}>
            Начать заново
          </Button>
        </Stack>
      ) : (
        <div>
          <Button onClick={handlePush} variant="contained">
            Начать тестирование
          </Button>
        </div>
      )}
    </>
  );
};
