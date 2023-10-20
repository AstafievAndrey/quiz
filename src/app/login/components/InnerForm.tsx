"use client";
import { ChangeEvent, FC, useState } from "react";
import { signIn } from "next-auth/react";
import { Stack, Typography, TextField, Button } from "@mui/material";

interface Props {}
export const InnerForm: FC<Props> = () => {
  const [userName, setUserName] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleSubmit = () => {
    signIn("credentials", {
      userName,
    });
  };

  return (
    <Stack spacing={2}>
      <Typography textAlign={"center"} variant="h5">
        Авторизация
      </Typography>

      <TextField
        fullWidth
        placeholder="Введите имя"
        onChange={handleChange}
        value={userName}
      />
      <Button onClick={handleSubmit} disabled={!userName}>
        Войти
      </Button>
    </Stack>
  );
};
