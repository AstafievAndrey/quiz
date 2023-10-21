import { FC } from "react";
import { LoginContainer } from "@/containers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Авторизация",
};
const Login: FC = () => {
  return <LoginContainer />;
};

export default Login;
