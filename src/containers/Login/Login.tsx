"use client";
import { FC } from "react";

import { Container, Paper } from "@mui/material";
import { InnerForm } from "./components";

export const LoginContainer: FC = () => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={2} sx={{ p: 2, m: 2 }}>
        <InnerForm />
      </Paper>
    </Container>
  );
};
