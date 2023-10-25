import { FC } from "react";
import { Metadata } from "next";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Страница не найдена",
};

const NotFound: FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: "10%",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ScreenSearchDesktopIcon sx={{ fontSize: "10.5rem" }} />
          </Grid>
          <Grid xs={12} sm={8}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              Страница которую вы пытаетесь посмотреть не существует
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NotFound;
