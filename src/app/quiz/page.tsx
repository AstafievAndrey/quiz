import { FC } from "react";
import { Metadata } from "next";
import {
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Rating,
  Slider,
  Stack,
  Typography,
} from "@mui/material";

export const metadata: Metadata = {
  title: "Тестирование",
  description: "Страница тестирования",
};

const QuizPage: FC = () => {
  return (
    <Container maxWidth="md">
      <Paper sx={{ m: 2, mt: 6, p: 2 }}>
        <Stack spacing={1}>
          <Typography variant="body1">Категория: Java Script</Typography>
          <Rating value={5} readOnly />
          <Typography variant="h6">Вопрос 1 из 20</Typography>
        </Stack>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Typography variant="h5">
          Как создать узел для комментариев в JavaScript?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" fullWidth>
              Comm()
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" fullWidth>
              createComment()
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" fullWidth>
              comment()
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" fullWidth>
              Ничего из перечисленного
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth>
              Продолжить
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Slider max={100} marks step={5} disabled />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default QuizPage;
