"use client";
import { FC, useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Fade,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { QuizResult } from "@prisma/client";
import { quizResultService } from "@/lib/services";

import { Table, UserInfo } from "./components";

export const HomeContainer: FC = () => {
  const [results, setResults] = useState<QuizResult[]>([]);

  const handleFetch = async () => {
    const res = await quizResultService.find();
    setResults(res);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <Fade in>
      <Container>
        <Paper sx={{ m: 2, p: 3 }}>
          <Stack spacing={2}>
            <UserInfo />

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
