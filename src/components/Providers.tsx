"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ruRU } from "@mui/x-data-grid";
import { ruRU as coreRuRU } from "@mui/material/locale";

const theme = createTheme({}, ruRU, coreRuRU);

interface Props {
  children: ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>;
    </SessionProvider>
  );
};

export default Providers;
