import { FC } from "react";
import { observer } from "mobx-react-lite";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import Face5Icon from "@mui/icons-material/Face5";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { quizStore } from "@/store";

export const Authenticated: FC = observer(() => {
  const { data } = useSession();
  const active = quizStore.getActive();
  const { push } = useRouter();

  const handlePush = () => {
    push("/quiz");
  };
  return (
    <Container>
      <Paper sx={{ m: 2, p: 3 }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <Face5Icon />
            <Typography>{data?.user?.userName}</Typography>
          </Stack>
          {active ? (
            <Stack spacing={2}>
              <Button onClick={handlePush} variant="contained">
                Продолжить
              </Button>
              <Button variant="contained">Начать заново</Button>
            </Stack>
          ) : (
            <div>
              <Button onClick={handlePush} variant="contained">
                Начать тестирование
              </Button>
            </div>
          )}
        </Stack>
      </Paper>
    </Container>
  );
});
