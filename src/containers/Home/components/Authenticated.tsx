import { FC } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Container,
  Divider,
  Fade,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Face5Icon from "@mui/icons-material/Face5";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useQuizLocalStorage } from "@/hooks/useQuizLocalStorage";
import { RouteEndpointEnum } from "@/lib/enums/RouteEndpointEnum";
import { Table } from "./Table";

export const Authenticated: FC = () => {
  const { data } = useSession();
  const { active, results, handleActive } = useQuizLocalStorage(
    data?.user.userName ?? null
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
    <Fade in>
      <Container>
        <Paper sx={{ m: 2, p: 3 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems={"center"}>
              <Avatar>
                <Face5Icon />
              </Avatar>

              <Typography fontWeight={500}>{data?.user?.userName}</Typography>
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

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography fontWeight={"bold"}>
                  История результатов
                  {results.length ? `(${results.length})` : null}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Table rows={results} />
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Paper>
      </Container>
    </Fade>
  );
};
