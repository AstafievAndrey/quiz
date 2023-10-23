"use client";
import { ChangeEvent, FC, useState } from "react";
import { signIn } from "next-auth/react";
import { Stack, Typography, TextField, Button } from "@mui/material";
import { useSearchParams } from "next/navigation";

interface Props {}
export const InnerForm: FC<Props> = () => {
  const param = useSearchParams();
  const [name, setUserName] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleSubmit = () => {
    const callbackUrl = param.get("callbackUrl") ?? "/";
    signIn("credentials", {
      name,
      callbackUrl,
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
        value={name}
      />
      <Button onClick={handleSubmit} disabled={!name}>
        Войти
      </Button>
    </Stack>
  );
};
