"use client";
import { Box, CircularProgress, Container, Fade } from "@mui/material";
import { useSession } from "next-auth/react";
import { FC } from "react";

interface Props {
  children: React.ReactNode;
}
export const LoadingContainer: FC<Props> = ({ children }) => {
  const { status } = useSession();
  return status === "loading" ? (
    <Box
      sx={{ width: "100%", p: 4, display: "flex", justifyContent: "center" }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Fade in>
      <Container>{children}</Container>
    </Fade>
  );
};
